"use client";

import Navbar from "@/components/navbar/Navbar";
import MealForm from "@/components/MealForm";
import ResultCard from "@/components/ResultCard";
import { useAuthGuard } from "@/lib/authGuard";
import { useMealStore } from "@/stores/mealStore";
import { Loader2 } from "lucide-react";

export default function CaloriesPage() {
  useAuthGuard();
  const { globalMealLoading } = useMealStore();

  return (
    <div className="relative min-h-screen w-full flex flex-col
        bg-[#F2EFE9] dark:bg-[#0E0C0A]">
      <Navbar />
      <section
        className="flex flex-col md:flex-row items-start justify-center
        gap-6 md:gap-10 w-full px-4 sm:px-6 md:px-10 pt-28 pb-10 max-w-5xl mx-auto"
      >
        <MealForm />
        <ResultCard />
      </section>

      {globalMealLoading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <Loader2 className="w-14 h-14 animate-spin text-white" />
        </div>
      )}
    </div>
  );
}
