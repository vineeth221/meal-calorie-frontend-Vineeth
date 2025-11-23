"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import AuthForm from "@/components/AuthForm";
import ModeToggle from "@/components/mode-toggle";
import Link from "next/link";
import { Flame } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);

  useEffect(() => {
    if (hydrated && token) router.replace("/dashboard");
  }, [hydrated, token, router]);

  if (!hydrated) return null;

  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden
      bg-gradient-to-br from-[#FFF4E5] via-[#FFE3C9] to-[#FFD5A8]
      dark:bg-gradient-to-br dark:from-[#1A120A] dark:via-[#291D12] dark:to-[#3A2915]"
    >
      {/* Glowing background accents */}
      <div className="absolute -top-28 -left-20 w-[380px] h-[380px] rounded-full bg-orange-400/30 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-amber-300/30 blur-[160px]" />

      {/* Brand */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex flex-col items-start"
      >
        <div
          className="flex items-center gap-2 font-extrabold text-3xl tracking-tight
          bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E] bg-clip-text text-transparent"
        >
          <Flame className="w-8 h-8 text-[#FF8A3D]" />
          CalorEase
        </div>

        <span className="ml-1 mt-1 text-[10px] sm:text-xs font-medium tracking-wide 
          text-[#8C4E2C] dark:text-[#E5C7A5] opacity-90">
          Smarter Food Choices, Every Day
        </span>
      </button>

      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>

      {/* Login Card */}
      <div
        className="relative z-10 w-full max-w-md p-8 rounded-3xl
        bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-white/40 shadow-[0_0_40px_rgba(255,125,60,0.25)]"
      >
        <h2 className="text-3xl font-extrabold text-center mb-5 
        bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E] bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-center text-sm mb-6 text-[#5A3A23] dark:text-gray-300">
          Log in to continue tracking your meals & calories
        </p>

        {/* Form */}
        <AuthForm mode="login" />

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-[#5A3A23] dark:text-gray-300">
          Don't have an account?
          <Link
            href="/register"
            className="ml-1 font-semibold bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E] bg-clip-text text-transparent hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
