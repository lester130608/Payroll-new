"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-bold">Payroll System</div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link
              href="/dashboard"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                pathname === "/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/payroll"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                pathname === "/payroll" ? "bg-gray-700" : ""
              }`}
            >
              Payroll
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                pathname === "/reports" ? "bg-gray-700" : ""
              }`}
            >
              Reports
            </Link>
          </li>
          <li>
            <Link
              href="/employees"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                pathname === "/employees" ? "bg-gray-700" : ""
              }`}
            >
              Employees
            </Link>
          </li>
        </ul>
      </nav>
      <button
        className="bg-red-600 hover:bg-red-700 p-2 m-4 rounded"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
