"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingHero from "@/components/landing/LandingHero";

export default function Home() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);

  useEffect(() => {
    if (!hydrated) return;
    if (token) router.replace("/dashboard");
  }, [token, hydrated, router]);

  if (!hydrated) return null;

  return <LandingHero />;
}
