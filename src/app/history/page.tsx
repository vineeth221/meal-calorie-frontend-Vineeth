"use client";

import { useMealStore } from "@/stores/mealStore";
import Navbar from "@/components/navbar/Navbar";
import { Flame, ChefHat, Factory, Utensils, Salad, Pizza, Sandwich } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const { mealHistory } = useMealStore();
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(mealHistory.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = mealHistory.slice(start, end);

  return (
    <div
      className="min-h-screen w-full flex flex-col min-h-screen w-full flex flex-col
            bg-[#F2EFE9] dark:bg-[#0E0C0A]"
    >
      <Navbar />

      <div className="pt-24 sm:pt-28 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 text-center drop-shadow-md">
          <span className="bg-gradient-to-r from-[#FF7A32] to-[#FF3D00] bg-clip-text text-transparent">
            Your Meal Journey
          </span>
        </h1>

        <p className="text-center text-[#6B3A20] dark:text-gray-300 mb-8 text-xs sm:text-sm md:text-base lg:text-lg font-medium italic">
          Review your calories, track your progress, and stay consistent
        </p>

        {mealHistory.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base italic">
            Start calculating calories to build your history!
          </p>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
              {currentItems.map((m, i) => {
                const protein = Math.round((m.calories_per_serving * 0.3) / 4);
                const carbs = Math.round((m.calories_per_serving * 0.45) / 4);
                const fat = Math.round((m.calories_per_serving * 0.25) / 9);

                return (
                  <div
                    key={i}
                    className="p-4 sm:p-5 md:p-6 rounded-3xl bg-white/80 dark:bg-white/5 border border-white/40 shadow-xl
                    backdrop-blur-md hover:-translate-y-2 hover:shadow-[0px_20px_35px_rgba(0,0,0,0.2)]
                    transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FFA450] to-[#FF6B1A] shadow-md">
                        <ChefHat className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold capitalize text-[#4B1D04] dark:text-white">
                        {m.dish_name}
                      </h3>
                    </div>

                    {/* Main Details */}
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#7F00FF] to-[#E100FF]">
                          <Utensils className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs sm:text-sm font-semibold">Servings: {m.servings}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00A86B] to-[#25CC48]">
                          <Flame className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs sm:text-sm font-semibold">{m.calories_per_serving} cal / serving</p>
                      </div>

                      <p className="text-xl sm:text-2xl md:text-3xl font-extrabold mt-3 bg-gradient-to-r from-[#FF7A32] to-[#FF3D00] bg-clip-text text-transparent drop-shadow-md text-center">
                        {m.total_calories} cal total
                      </p>

                      {/* Macros Breakdown */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5 text-center">
                        <div className="p-2 sm:p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
                          <Salad className="mx-auto text-emerald-700 mb-1 w-4 h-4 sm:w-5 sm:h-5" />
                          <p className="font-bold text-xs sm:text-sm">{protein}g</p>
                          <span className="text-[9px] sm:text-xs">Protein</span>
                        </div>

                        <div className="p-2 sm:p-3 rounded-xl bg-sky-100 dark:bg-sky-900/40">
                          <Pizza className="mx-auto text-sky-700 mb-1 w-4 h-4 sm:w-5 sm:h-5" />
                          <p className="font-bold text-xs sm:text-sm">{carbs}g</p>
                          <span className="text-[9px] sm:text-xs">Carbs</span>
                        </div>

                        <div className="p-2 sm:p-3 rounded-xl bg-rose-100 dark:bg-rose-900/40">
                          <Sandwich className="mx-auto text-rose-700 mb-1 w-4 h-4 sm:w-5 sm:h-5" />
                          <p className="font-bold text-xs sm:text-sm">{fat}g</p>
                          <span className="text-[9px] sm:text-xs">Fat</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mt-4 justify-center opacity-75">
                        <Factory className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        <p className="text-[9px] sm:text-xs italic">Source: {m.source}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 mt-10 sm:mt-12">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-5 sm:px-6 py-2 sm:py-3 border-[#FF7A32] text-[#FF7A32] font-semibold rounded-xl backdrop-blur-md text-xs sm:text-sm"
              >
                Previous
              </Button>

              <span className="font-bold text-sm sm:text-base lg:text-lg text-[#4B1D04] dark:text-gray-300">
                {page} / {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-5 sm:px-6 py-2 sm:py-3 border-[#FF7A32] text-[#FF7A32] font-semibold rounded-xl backdrop-blur-md text-xs sm:text-sm"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
