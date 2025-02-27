"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import SidebarAdmin from "@/components/SidebarAdmin";
import SidebarSupervisorBA from "@/components/SidebarSupervisorBA";
import SidebarSupervisorTCM from "@/components/SidebarSupervisorTCM";
import SidebarSupervisorClinician from "@/components/SidebarSupervisorClinician";
import { useRouter } from "next/navigation"; // 🚀 Importamos useRouter
import { useEffect } from "react"; // 🔹 Importamos useEffect
import "../styles/globals.css"; // ✅ Importamos estilos globales

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className="bg-gray-100">
          <AppContent>{children}</AppContent>
        </body>
      </html>
    </SessionProvider>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter(); // 🚀 Usamos useRouter para redirecciones

  useEffect(() => {
    if (status === "authenticated") return;
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      {session?.user?.role === "admin" && <SidebarAdmin />}
      {session?.user?.role === "supervisor_ba" && <SidebarSupervisorBA />}
      {session?.user?.role === "supervisor_tcm" && <SidebarSupervisorTCM />}
      {session?.user?.role === "supervisor_clinician" && <SidebarSupervisorClinician />}
      <main className="flex-1 p-6 ml-60">{children}</main>
    </div>
  );
}