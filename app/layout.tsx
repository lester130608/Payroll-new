"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <SessionProvider>
          {isAuthPage ? (
            <>{children}</>
          ) : (
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 p-6 ml-64"> {/* 🔹 Agregamos `ml-64` para dejar espacio al Sidebar */}
                <Navbar />
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}