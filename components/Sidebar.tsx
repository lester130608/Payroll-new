"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login"); // Redirige a la página de login después de cerrar sesión
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-white shadow-md">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-700">Supervisor Panel</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link href="/dashboard" className="block p-4 text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/employees" className="block p-4 text-gray-700 hover:bg-gray-100">
              Employees
            </Link>
          </li>
          <li>
            <Link href="/payroll/employee/create" className="block p-4 text-gray-700 hover:bg-gray-100">
              Payroll Employee
            </Link>
          </li>
          <li>
            <Link href="/payroll/general" className="block p-4 text-gray-700 hover:bg-gray-100">
              Payroll General
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-6 absolute bottom-0 w-full border-t">
        {session?.user && (
          <div className="flex items-center justify-between">
            <span className="text-gray-700">{session.user.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}