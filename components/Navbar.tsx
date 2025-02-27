"use client";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">Payroll System</h1>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-gray-600">👤 {session.user.name || session.user.role}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-gray-400">Not logged in</span>
        )}
      </div>
    </nav>
  );
}