"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative bg-white/10 backdrop-blur-md border border-white/20 
                 hover:bg-white/20 transition-all shadow-md hover:scale-105"
    >
      <Sun className="h-5 w-5 text-grey-400 rotate-0 scale-100 transition-all 
                      dark:-rotate-90 dark:scale-0" />

      <Moon className="absolute h-5 w-5 text-blue-300 rotate-90 scale-0 transition-all
                       dark:rotate-0 dark:scale-100" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
