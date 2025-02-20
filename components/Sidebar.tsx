"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin = session?.user?.email === "lrojas@dttcoaching.com";

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/payroll", label: "Payroll" },
    { href: "/employees", label: "Employees" },
    { href: "/reports", label: "Reports" },
  ];

  if (isAdmin) {
    links.push({ href: "/configuracion", label: "Configuración" });
  }

  return (
    <aside className="bg-white shadow rounded-xl w-64 p-4 space-y-4 h-screen">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            "block text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition",
            pathname === link.href && "bg-blue-100 text-blue-700"
          )}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/auth/login"
        className="block text-red-600 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
      >
        Logout
      </Link>
    </aside>
  );
}
