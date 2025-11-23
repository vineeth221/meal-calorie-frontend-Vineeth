"use client";

import { useAuthStore } from "@/stores/authStore";
import { Flame} from "lucide-react";

export default function GlobalLoader() {
  const globalLoading = useAuthStore((state) => state.globalLoading);

  if (!globalLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50">
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Spinning gradient ring */}
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-red-500 border-r-orange-500 border-b-yellow-500 border-l-red-500 animate-spin-slow"></div>
        </div>

        {/* Fire icon */}
        <div className="absolute text-5xl animate-pulse drop-shadow-[0_0_12px_rgba(255,100,100,0.9)]">
        <Flame className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
        </div>

        <p className="mt-6 text-white font-semibold tracking-wide text-lg animate-pulse">
           loading...
        </p>
      </div>
    </div>
  );
}
