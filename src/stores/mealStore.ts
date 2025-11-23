import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useAuthStore } from "./authStore";
import { getCalories } from "@/lib/meals";
import { CalorieRequest, CalorieResponse } from "@/types/meal";
import { toast } from "sonner";

interface MealState {
  result: CalorieResponse | null;
  mealHistory: CalorieResponse[];
  loading: boolean;
  globalMealLoading: boolean;
  error: string | null;

  fetchCalories: (data: CalorieRequest) => Promise<void>;
  addMealResult: (data: CalorieResponse) => void;
  clearHistory: () => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      result: null,
      mealHistory: [],
      loading: false,
      globalMealLoading: false,
      error: null,

      addMealResult: (data) =>
        set((state) => ({
          mealHistory: [data, ...state.mealHistory],
          result: data,
        })),

      clearHistory: () => set({ mealHistory: [] }),

      fetchCalories: async (data) => {
        const token = useAuthStore.getState().token;
      
        try {
          set({ loading: true, globalMealLoading: true, error: null });
      
          const res: CalorieResponse = await getCalories(data, token!);
      
          set((state) => ({
            result: res,
            mealHistory: [res, ...state.mealHistory],
          }));
      
          toast.success("Calories fetched successfully!");
      
        } catch (err: any) {
      
          if (err?.response?.status === 401 || err.message?.includes("Invalid token")) {
            useAuthStore.getState().logout();
            return;
          }
      
          const message =
            err?.response?.data?.error ||
            "Calorie lookup unavailable for selected quantity";
      
          // set({ error: message });
          toast.error(message);
      
        } finally {
          set({ loading: false, globalMealLoading: false });
        }
      },
            
    }),
    {
      name: "meal-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
