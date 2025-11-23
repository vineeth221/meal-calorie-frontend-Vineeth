"use client";

import { useAuthStore } from "@/stores/authStore";
import { useAuthGuard } from "@/lib/authGuard";
import { useMealStore } from "@/stores/mealStore";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, History, Drumstick, Salad, Sandwich, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const QUICK_MEALS = [
  { label: "Chicken Biryani", dish_name: "chicken biryani", servings: 1, icon: <Drumstick className="w-6 h-6 text-[#FF7A32]" /> },
  { label: "Veg Salad Bowl", dish_name: "vegetable salad", servings: 1, icon: <Salad className="w-6 h-6 text-[#22A55B]" /> },
  { label: "Grilled Sandwich", dish_name: "grilled sandwich", servings: 1, icon: <Sandwich className="w-6 h-6 text-[#F97316]" /> },
];

export default function DashboardPage() {
  useAuthGuard();

  const router = useRouter();
  const { user, logout, hydrated } = useAuthStore();
  const { fetchCalories, loading } = useMealStore();

  if (!hydrated) return null;

  const handleQuickLookup = async (dish_name: string, servings: number) => {
    try {
      await fetchCalories({ dish_name, servings });
      router.push("/calories");
    } catch {
      toast.error("Failed to fetch calories");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col min-h-screen w-full flex flex-col
      bg-[#F2EFE9] dark:bg-[#0E0C0A]"
    >
      <Navbar />

      <main className="flex flex-col items-center px-6 pt-28 pb-14 w-full max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Welcome{" "}
          <span className="bg-gradient-to-r from-[#FF7A32] to-[#FF5E1A] bg-clip-text text-transparent">
            {user?.firstName}
          </span>

        </h1>
        <p className="mt-3 text-sm sm:text-lg text-[#5A4531] dark:text-gray-300 max-w-lg">
          Track your meals, calculate calories & stay healthy every day.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mt-12 mb-10">

          <Link href="/calories" className="block">
            <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/10 border border-white/40 
              hover:scale-[1.05] hover:shadow-[0_10px_35px_rgba(255,122,50,0.35)]
              backdrop-blur-xl shadow-[0_6px_25px_rgba(255,122,50,0.15)] transition-all text-left cursor-pointer relative">

              <div className="p-3 rounded-full w-fit mb-4 bg-gradient-to-br from-[#FF7A32] to-[#FF5E1A] shadow-lg">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold">Calorie Calculator</h3>
              <p className="text-sm mt-1 text-[#5A4531] dark:text-gray-400">Enter a meal & get instant insights.</p>

              {/* Small note / arrow */}
              <div className="absolute bottom-2 right-3 text-[10px] text-[#FF7A32] font-semibold flex items-center gap-1">
                open <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>

          <Link href="/history" className="block">
            <div className="group p-6 rounded-2xl bg-white/90 dark:bg-white/10 border border-white/40
              hover:scale-[1.05] hover:shadow-[0_10px_35px_rgba(255,122,50,0.35)]
              backdrop-blur-xl shadow-[0_6px_25px_rgba(255,122,50,0.15)] transition-all text-left cursor-pointer relative">

              <div className="p-3 rounded-full w-fit mb-4 bg-gradient-to-br from-[#F97316] to-[#FB923C] shadow-lg">
                <History className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold">Meal History</h3>
              <p className="text-sm mt-1 text-[#5A4531] dark:text-gray-400">View your previous calorie logs.</p>

              <div className="absolute bottom-2 right-3 text-[10px] text-[#FF7A32] font-semibold flex items-center gap-1">
                view <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Lookup */}
        <h2 className="text-xl sm:text-2xl font-bold w-full max-w-4xl text-left">
          Quick Calorie Lookup
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-6">
          {QUICK_MEALS.map((meal) => (
            <button
              key={meal.label}
              onClick={() => handleQuickLookup(meal.dish_name, meal.servings)}
              disabled={loading}
              className="group p-5 rounded-2xl bg-white/90 dark:bg-white/10 border border-white/40
                    hover:scale-[1.05] hover:shadow-[0_12px_38px_rgba(255,122,50,0.30)]
                    transition-all text-center relative shadow-md cursor-pointer flex flex-col"
            >
              <div className="mb-3 p-3 rounded-full bg-orange-50 dark:bg-orange-900/40 mx-auto w-fit shadow-inner">
                {meal.icon}
              </div>

              <p className="font-bold text-sm sm:text-base">{meal.label}</p>
              <p className="text-[11px] mt-1 text-[#8A6245] dark:text-gray-400 italic opacity-90">
                Tap to calculate instantly
              </p>

              <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px]
                       font-semibold text-[#FF7A32] opacity-80 group-hover:opacity-100">
                Go <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
        <Button
          onClick={logout}
          variant="outline"
          className="mt-14 px-8 py-4 text-lg border-[#FF7A32] text-[#FF6A2E] hover:bg-[#FF7A32]/10 font-semibold"
        >
          Log out
        </Button>
      </main>
    </div>
  );
}
