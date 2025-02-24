"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-white shadow-md">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-gray-700">Admin Panel</h1>
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
            <Link href="/payroll" className="block p-4 text-gray-700 hover:bg-gray-100">
              Payroll
            </Link>
          </li>
          <li>
            <Link href="/reports" className="block p-4 text-gray-700 hover:bg-gray-100">
              Reports
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block p-4 text-gray-700 hover:bg-gray-100">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}