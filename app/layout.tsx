"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import SidebarAdmin from "@/components/SidebarAdmin";
import SidebarSupervisorBA from "@/components/SidebarSupervisorBA";
import SidebarSupervisorTCM from "@/components/SidebarSupervisorTCM";
import SidebarSupervisorClinician from "@/components/SidebarSupervisorClinician";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../styles/globals.css"; // ✅ Importamos estilos globales

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <AppContent>{children}</AppContent>
        </body>
      </html>
    </SessionProvider>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true); // ✅ Estado para controlar el sidebar

  useEffect(() => {
    if (status === "authenticated") return;
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    // ✅ Asegurar que el sidebar no se muestre en login
    setShowSidebar(pathname !== "/auth/login");
  }, [pathname]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen">
      {/* 📌 Sidebar solo si `showSidebar` es true */}
      {showSidebar && (
        <aside className="w-60 h-screen bg-white shadow-lg fixed">
          <div className="p-4 font-bold text-lg border-b">Admin Panel</div>
          {session?.user?.role === "admin" && <SidebarAdmin />}
          {session?.user?.role === "supervisor_ba" && <SidebarSupervisorBA />}
          {session?.user?.role === "supervisor_tcm" && <SidebarSupervisorTCM />}
          {session?.user?.role === "supervisor_clinician" && <SidebarSupervisorClinician />}
        </aside>
      )}

      {/* 📌 Contenido principal con margen si el sidebar está presente */}
      <main className={`flex-1 p-6 transition-all ${showSidebar ? "ml-60" : ""}`}>
        {children}
      </main>
    </div>
  );
}