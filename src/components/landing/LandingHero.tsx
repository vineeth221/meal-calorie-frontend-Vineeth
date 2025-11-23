"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ModeToggle from "@/components/mode-toggle";
import { Flame } from "lucide-react";

export default function LandingHero() {
  const router = useRouter();

  return (
    <section
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center 
      justify-center md:justify-between gap-8 md:gap-0
      pt-24 md:pt-0 px-4 sm:px-6 md:px-16 overflow-hidden
      bg-gradient-to-br from-[#FFF7EB] via-[#FFE6CB] to-[#FFD9B0]
      dark:bg-gradient-to-br dark:from-[#1C140D] dark:via-[#2C1E10] dark:to-[#382514]
      text-[#4A3216] dark:text-white"
    >
    {/* BRAND */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex flex-col items-start">
        <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl tracking-wide 
            bg-gradient-to-r from-[#FF8A3D] to-[#FF6F21] bg-clip-text text-transparent hover:opacity-90 transition-all"
        >
            <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF8A3D]" />
            CalorEase
        </button>

        {/* Caption */}
        <span className="mt-1 text-[10px] sm:text-xs font-medium 
            text-[#864C2A] dark:text-[#E3C3A0] tracking-wide opacity-90">
        Smarter Food Choices, Every Day
        </span>
        </div>
      {/* MODE TOGGLE */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ModeToggle />
      </div>

      {/* CONTENT SECTION */}
      <div className="relative z-10 flex flex-col gap-4 md:gap-6 max-w-xl text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
          Eat Smart.{" "}
          <span className="text-[#FF7A32] dark:text-[#FFA267]">Track Calories.</span>
          <br /> Live Healthy.
        </h1>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#5A4531] dark:text-gray-300">
        Instant calorie insights — make better food choices every day.
        </p>

        {/* BUTTON GROUP */}
        <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mt-2">
          <Button
            size="lg"
            className="px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 
            text-sm sm:text-base md:text-lg font-semibold bg-[#FF7A32] hover:bg-[#F66A26]
            text-white shadow-lg hover:scale-[1.05] transition-all"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 
            text-sm sm:text-base md:text-lg font-semibold border-[#FF7A32]
            text-[#FF6A2E] dark:text-[#FFA267] hover:bg-[#FF7A32]/10 hover:scale-[1.05] transition-all"
            onClick={() => router.push("/register")}
          >
            Create Account
          </Button>
        </div>

        {/* FEATURE TAGS */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 pt-3">
          <span className="px-4 py-2 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md 
          border border-white/20 text-xs sm:text-sm font-semibold">
            🥗 Track Meals
          </span>
          <span className="px-4 py-2 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md 
          border border-white/20 text-xs sm:text-sm font-semibold">
            📊 Nutrition Insights
          </span>
        </div>
      </div>

      {/* IMAGE SIDE */}
      <div className="relative z-10 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-xl mt-6 md:mt-0">
        <img
          src="/calorie.png"
          alt="Food Bowl"
          className="w-[85%] sm:w-[70%] md:w-[90%] object-contain
          drop-shadow-[0_20px_55px_rgba(255,120,60,0.35)]
          hover:scale-105 transition-transform duration-700"
        />
      </div>
    </section>
  );
}
