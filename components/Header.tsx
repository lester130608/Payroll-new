"use client";

import { useSession } from "next-auth/react";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      {session && (
        <p className="text-gray-700">Welcome, {session.user?.email}</p>
      )}
    </div>
  );
}
