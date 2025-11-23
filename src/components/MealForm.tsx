"use client";

import { useState, useEffect, useMemo } from "react";
import { useMealStore } from "@/stores/mealStore";
import { CalorieRequest } from "@/types/meal";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Drumstick, UtensilsCrossed, Loader2 } from "lucide-react";

const schema = z.object({
  dish_name: z.string().min(2),
  servings: z.number().min(1),
});

const suggestions = [
  "chicken biryani","chicken salad","paneer tikka","grilled chicken","pasta alfredo",
  "veg biryani","idli sambar","roti sabzi","dal rice","pizza","burger","poha","upma"
];

export default function MealForm() {
  const { fetchCalories, loading, error, mealHistory } = useMealStore();
  const latest = mealHistory[0];

  const [showSuggestions, setShowSuggestions] = useState(false);

  const form = useForm<CalorieRequest>({
    resolver: zodResolver(schema),
    defaultValues: { dish_name: "", servings: 1 },
  });

  const dishValue = form.watch("dish_name");

  const filteredSuggestions = useMemo(() => {
    if (!dishValue || dishValue.trim().length < 2) return [];
    return suggestions
      .filter((d) => d.toLowerCase().includes(dishValue.toLowerCase()))
      .slice(0, 6);
  }, [dishValue]);

  const onSubmit = async (data: CalorieRequest) => {
    await fetchCalories(data);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="w-full flex flex-col items-center">

      {/* FORM CARD */}
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl
        bg-white/70 dark:bg-white/10 backdrop-blur-2xl border border-white/30">

        <h2 className="text-3xl font-extrabold text-center mb-1 bg-gradient-to-r
        from-[#FF7A32] to-[#FF5E1A] bg-clip-text text-transparent">
          Calorie Lookup
        </h2>

        {/* Caption under title */}
        <p className="text-center text-[11px] sm:text-xs text-[#8A6245] dark:text-gray-300 opacity-80 mb-5 italic font-medium">
          Find accurate calorie estimates for any meal — instantly & smartly
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            {/* Dish Field */}
            <FormField
              control={form.control}
              name="dish_name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-semibold">Dish Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UtensilsCrossed className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF7A32]" />
                      <Input
                        {...field}
                        placeholder="Chicken Biryani / Pasta / Salad"
                        className="pl-10 py-6 rounded-xl shadow-sm"
                        onFocus={() => setShowSuggestions(true)}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setShowSuggestions(true);
                        }}
                      />
                    </div>
                  </FormControl>

                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div
                      className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-md z-50 max-h-48 overflow-auto"
                    >
                      {filteredSuggestions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-orange-50"
                          onClick={() => {
                            form.setValue("dish_name", item);
                            setShowSuggestions(false);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* Servings */}
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Servings</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Drumstick className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FF7A32]" />
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="pl-10 py-6 rounded-xl shadow-sm"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-5 font-semibold text-white rounded-xl
              bg-gradient-to-r from-[#FF8A3D] to-[#FF6A1E]
              shadow-lg hover:scale-[1.04] transition-all"
            >
              {loading ? <Loader2 className="animate-spin w-6 h-6" /> : "Get Calories"}
            </Button>
          </form>
        </Form>
      </div>

      {/* RECENT SEARCH SECTION */}
      {latest && (
        <div
          className="mt-6 max-w-md w-full bg-white/90 dark:bg-white/10 rounded-2xl border border-white/40 
              shadow-lg p-5 flex flex-col items-center text-center"
        >
          
          {/*  Caption */}
          <p className="text-[11px] sm:text-xs mb-2 italic opacity-70 text-[#8A6245] dark:text-gray-300">
            Your most recent calorie search
          </p>

          <div className="flex justify-between items-center w-full mb-2">
            <h3 className="font-bold text-base sm:text-lg">Recent Search</h3>
            <span className="text-[10px] sm:text-xs text-gray-500">Updated now</span>
          </div>

          <div
            className="w-full flex flex-col sm:flex-row items-center justify-between gap-2
                bg-white dark:bg-white/5 p-4 rounded-xl border text-center sm:text-left"
          >
            <div className="flex flex-col items-center sm:items-start">
              <p className="font-bold text-sm sm:text-base capitalize">{latest.dish_name}</p>
              <p className="text-[11px] sm:text-xs opacity-70">{latest.servings} servings</p>
            </div>

            <div className="flex flex-col items-center font-bold text-[#FF7A32]">
              <p className="text-lg sm:text-xl">{latest.total_calories} cal</p>
              <p className="text-[10px] sm:text-xs opacity-70 italic">
                {latest.calories_per_serving} cal / serving
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
