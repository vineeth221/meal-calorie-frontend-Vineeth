"use client";

import { useMealStore } from "@/stores/mealStore";
import { Flame, Salad, Pizza, Sandwich, Sparkles } from "lucide-react";

export default function ResultCard() {
  const result = useMealStore((state) => state.result);

  if (!result) {
    return (
      <div className="text-center opacity-75 max-w-md">
        <Sparkles className="mx-auto w-10 h-10 text-[#FF7A32] mb-2" />
        <p className="text-sm font-medium">Results will appear here after calculation</p>
      </div>
    );
  }

  const protein = Math.round((result.calories_per_serving * 0.3) / 4);
  const carbs = Math.round((result.calories_per_serving * 0.45) / 4);
  const fat = Math.round((result.calories_per_serving * 0.25) / 9);

  return (
    <div className="w-full flex justify-center items-center px-3 sm:px-6 md:px-8">
      <div
        className="w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl bg-white/80 dark:bg-white/10
        backdrop-blur-2xl border border-white/40 animate-fadeIn"
      >
        {/* Title */}
        <div className="flex flex-col gap-1 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 justify-start">
            <Flame className="w-7 h-7 sm:w-9 sm:h-9 text-[#FF6A1E]" />
            <h3 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#FF7A32] to-[#FF5E1A] bg-clip-text text-transparent">
              Results
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 italic text-center">
            Detailed nutritional breakdown for your selected meal
          </p>
          <div className="mt-2 w-full text-center">
            <h4 className="text-xl sm:text-2xl font-bold capitalize text-[#3A210F] dark:text-white tracking-wide">
              {result.dish_name}
            </h4>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#FF7A32]/40 mt-2 sm:mt-3" />

            <p className="text-2xl sm:text-3xl font-extrabold mt-2 bg-gradient-to-r from-[#FF7A32] to-[#FF3D00] bg-clip-text text-transparent drop-shadow-sm tracking-wide">
              {result.total_calories}
              <span className="text-xs sm:text-sm font-semibold ml-1">cal total</span>
            </p>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#FF7A32]/40 mt-2 sm:mt-3 mb-3" />
          </div>
        </div>

        {/* Servings & Calories block */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
          <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 shadow-sm border border-orange-200/50">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-[#FF7A32]">Servings</p>
            <p className="text-lg sm:text-xl font-extrabold text-[#FF6A1E]">{result.servings}</p>
          </div>

          <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10 shadow-sm border border-yellow-200/50">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-[#FF7A32]">Calories / Serving</p>
            <p className="text-lg sm:text-xl font-extrabold text-[#FF6A1E]">
              {result.calories_per_serving} <span className="text-xs sm:text-sm">cal</span>
            </p>
          </div>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-6 text-center">
          <div className="p-2 sm:p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
            <Salad className="mx-auto w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 mb-1" />
            <p className="font-bold text-sm sm:text-base">{protein}g</p>
            <span className="text-[10px] sm:text-xs">Protein</span>
          </div>

          <div className="p-2 sm:p-3 rounded-xl bg-sky-100 dark:bg-sky-900/40">
            <Pizza className="mx-auto w-4 h-4 sm:w-5 sm:h-5 text-sky-700 mb-1" />
            <p className="font-bold text-sm sm:text-base">{carbs}g</p>
            <span className="text-[10px] sm:text-xs">Carbs</span>
          </div>

          <div className="p-2 sm:p-3 rounded-xl bg-rose-100 dark:bg-rose-900/40">
            <Sandwich className="mx-auto w-4 h-4 sm:w-5 sm:h-5 text-rose-700 mb-1" />
            <p className="font-bold text-sm sm:text-base">{fat}g</p>
            <span className="text-[10px] sm:text-xs">Fat</span>
          </div>
        </div>

        <p className="text-[10px] sm:text-xs mt-4 text-gray-600 dark:text-gray-300 italic">
          Source: {result.source}
        </p>
      </div>
    </div>
  );
}
