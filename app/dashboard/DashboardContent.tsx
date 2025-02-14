"use client";

import { signOut } from "next-auth/react";

export default function DashboardContent({ email }: { email: string | null | undefined }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {email}</p>

      <button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
