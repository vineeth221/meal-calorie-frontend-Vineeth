"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalLoader from "@/components/GlobalLoader";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);
  const setHydrated = useAuthStore((s) => s.setHydrated);
  const setGlobalLoading = useAuthStore((s) => s.setGlobalLoading);

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setGlobalLoading(true);
    const t = setTimeout(() => setGlobalLoading(false), 800);
    return () => clearTimeout(t);
  }, [pathname, hydrated, setGlobalLoading]);

  useEffect(() => {
    if (!hydrated) return;
    if (!token && pathname.startsWith("/dashboard")) router.replace("/login");
  }, [token, hydrated, pathname, router]);

  if (!hydrated) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <GlobalLoader />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalLoader />
          <Toaster richColors position="top-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
