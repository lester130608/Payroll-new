"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function SidebarSupervisorClinician() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-white shadow-md z-10 overflow-y-auto">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-700">Supervisor Clinician</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link href="/dashboard" className="block p-4 text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/payroll/clinicians/create" className="block p-4 text-gray-700 hover:bg-gray-100">
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
      <div className="absolute bottom-6 left-6">
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}