"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Flame, Menu, X, History, Calculator, LogOut, LayoutGrid } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import ModeToggle from "../mode-toggle";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl
      bg-gradient-to-r from-[#FFF7EF]/80 via-[#FFECD9]/80 to-[#FFE4C8]/80
      dark:from-[#1A120A]/80 dark:via-[#291D12]/80 dark:to-[#3A2915]/80
      border-b border-white/10 shadow-sm px-4 py-3 flex justify-between items-center"
    >
      {/* Brand */}
      <div className="flex flex-col items-start cursor-pointer select-none"
           onClick={() => router.push("/dashboard")}>
        
        <div className="flex items-center gap-2 font-extrabold text-lg sm:text-xl tracking-tight
          bg-gradient-to-r from-[#FF7A32] to-[#FF5E1A] bg-clip-text text-transparent">
          <Flame className="w-6 h-6 text-[#FF7A32]" />
          CalorEase
        </div>

        <span className="text-[9px] sm:text-[11px] font-medium mt-0.5
          text-[#864C2A] dark:text-[#E3C3A0] tracking-wide opacity-80">
          Smarter Food Choices, Every Day
        </span>
      </div>

      {/* MODE TOGGLE ALWAYS VISIBLE - MOBILE + DESKTOP */}
      <div className="flex md:order-2 items-center gap-4">
        <ModeToggle />

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 font-semibold text-sm">
        <Link href="/dashboard"
          className={`${pathname === "/dashboard" ? "text-[#FF7A32]" : "hover:text-[#FF7A32]"} transition`}
        >
          Dashboard
        </Link>

        <Link href="/calories"
          className={`${pathname === "/calories" ? "text-[#FF7A32]" : "hover:text-[#FF7A32]"} transition`}
        >
          Track Calories
        </Link>

        <Link href="/history"
          className={`${pathname === "/history" ? "text-[#FF7A32]" : "hover:text-[#FF7A32]"} transition`}
        >
          Meal History
        </Link>

        <div
          onClick={() => logout()}
          className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg font-semibold text-white
          bg-gradient-to-r from-[#FF7A32] to-[#FF5E1A] hover:scale-105 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="absolute top-16 left-0 w-full px-4 py-4 rounded-b-2xl
          bg-gradient-to-b from-[#FFF7EF] to-[#FFEAD8]
          dark:from-[#1A120A] dark:to-[#3A2915]
          backdrop-blur-xl flex flex-col gap-3 md:hidden shadow-lg text-center font-semibold text-base"
        >
          <Link href="/dashboard" onClick={() => setOpen(false)} className="flex justify-center gap-2 py-2">
            <LayoutGrid className="w-5 h-5" /> Dashboard
          </Link>

          <Link href="/calories" onClick={() => setOpen(false)} className="flex justify-center gap-2 py-2">
            <Calculator className="w-5 h-5" /> Track Calories
          </Link>

          <Link href="/history" onClick={() => setOpen(false)} className="flex justify-center gap-2 py-2">
            <History className="w-5 h-5" /> Meal History
          </Link>

          <div
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex justify-center gap-2 py-2 text-[#FF7A32] cursor-pointer"
          >
            <LogOut className="w-5 h-5" /> Logout
          </div>
        </div>
      )}
    </nav>
  );
}
