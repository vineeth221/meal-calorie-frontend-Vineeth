import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { RegisterRequest, LoginRequest, User, LoginResponse } from "@/types/auth";
import { loginUser, registerUser } from "@/lib/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  hydrated: boolean;
  globalLoading: boolean;

  setHydrated: () => void;
  setGlobalLoading: (v: boolean) => void;

  login: (data: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      loading: false,
      error: null,

      hydrated: false,
      setHydrated: () => set({ hydrated: true }),

      globalLoading: false,
      setGlobalLoading: (v) => set({ globalLoading: v }),

      // REGISTER ACTION
      register: async (data) => {
        try {
          set({ loading: true, error: null });

          const res = await registerUser(data);
          set({ user: null });
          return { success: true };
        } catch (err: any) {
          const message = err.message || "Registration failed";
          set({ error: message });
          return { success: false, error: message };
        } finally {
          set({ loading: false });
        }
      },

      // LOGIN ACTION
      login: async (data) => {
        try {
          set({ loading: true, error: null });

          const res: LoginResponse = await loginUser(data);

          set({
            token: res.token,
            user: res.user,
          });

          return { success: true };
        } catch (err: any) {
          const message = err.message || "Login failed";
          set({ error: message });
          return { success: false, error: message };
        } finally {
          set({ loading: false });
        }
      },

      // LOGOUT
      logout: () => {
        set({ token: null, user: null });
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    }
  )
);
