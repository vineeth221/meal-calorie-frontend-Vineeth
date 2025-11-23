"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import AuthForm from "@/components/AuthForm";
import ModeToggle from "@/components/mode-toggle";
import Link from "next/link";
import { Flame } from "lucide-react";

export default function RegisterPage() {
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
      bg-gradient-to-br from-[#FFEED8] via-[#FFD5B0] to-[#FFC38F]
      dark:bg-gradient-to-br dark:from-[#1A130C] dark:via-[#26180E] dark:to-[#3A2414]"
    >
      {/* Glow Lights */}
      <div className="absolute -top-32 -left-20 w-[380px] h-[380px] rounded-full bg-orange-400/30 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-amber-300/30 blur-[160px]" />

      {/* Brand */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex flex-col items-start"
      >
        <div className="flex items-center gap-2 font-extrabold text-3xl tracking-tight
        bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E] bg-clip-text text-transparent">
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

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl
        bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-white/40
        shadow-[0_0_40px_rgba(255,130,60,0.25)]">

        <h2 className="text-3xl font-extrabold text-center mb-5
          bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E] bg-clip-text text-transparent">
          Create Account
        </h2>

        <AuthForm mode="register" />

        <p className="mt-6 text-center text-sm font-medium 
         bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E] bg-clip-text text-transparent">
          Join today to track your calorie nutrition 
        </p>

        <p className="mt-4 text-center text-sm text-[#5A3A23] dark:text-gray-300">
          Already have an account?
          <Link
            href="/login"
            className="ml-1 font-semibold bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E]
            bg-clip-text text-transparent hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
