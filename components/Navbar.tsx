"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow rounded-xl p-4 mb-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src="/logo.jpg" alt="Company Logo" width={40} height={40} className="rounded-full" />
        <span className="text-xl font-semibold text-gray-700">Payroll System</span>
      </div>

      {/* Usuario */}
      <div className="text-sm text-gray-600">
        {session?.user?.email ? `Welcome, ${session.user.email}` : "Welcome"}
      </div>
    </nav>
  );
}
