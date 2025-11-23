"use client";

import { useAuthStore } from "@/stores/authStore";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});


type LoginFormType = z.infer<typeof loginSchema>;
type RegisterFormType = z.infer<typeof registerSchema>;

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { login, register, loading } = useAuthStore();
  const router = useRouter();

  const schema = mode === "login" ? loginSchema : registerSchema;

  const form = useForm<LoginFormType | RegisterFormType>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "login"
        ? { email: "", password: "" }
        : {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        },
  });

  const onSubmit = async (data: LoginFormType | RegisterFormType) => {
    if (mode === "login") {
      const result = await login(data as LoginRequest);

      if (result.success) {
        toast.success("Logged in!");
        router.replace("/dashboard"); 
      } else {
        toast.error(result.error);
      }
    } else {
      const result = await register(data as RegisterRequest);

      if (result.success) {
        toast.success("Registered successfully!");
        router.replace("/login");
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">
        {/* {mode === "login" ? "Login" : "Register"} */}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Register extra fields */}
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-4">
              <FormField name="firstName" control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField name="lastName" control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Doe" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
          {/* Common fields */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="john@example.com" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 font-semibold text-white rounded-xl
          bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E]
          shadow-lg hover:shadow-[0_0_18px_rgba(255,120,50,0.55)]
          hover:scale-[1.04] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </div>
          ) : mode === "login" ? "Login" : "Create Account"}
        </Button>
        </form>
      </Form>
    </div>
  );
}
