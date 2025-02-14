"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

export default function UsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);

  // Simulamos los datos por ahora
  useEffect(() => {
    setUsers([
      { id: "1", name: "John Doe", role: "Supervisor", email: "john@example.com" },
      { id: "2", name: "Alice Smith", role: "RBT", email: "alice@example.com" },
      { id: "3", name: "Bob Johnson", role: "BCBA", email: "bob@example.com" },
    ]);
  }, []);

  // Simulación de exportar a CSV (en el futuro lo mejoramos)
  const handleExport = () => {
    const csvContent = `Name,Role,Email\n${users
      .map((user) => `${user.name},${user.role},${user.email}`)
      .join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      {/* Botones de Acciones */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => router.push("/users/create")}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          New User
        </button>
        <button
          onClick={() => router.push("/users/modify")}
          className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
        >
          Modify User
        </button>
        <button
          onClick={() => router.push("/users/delete")}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete User
        </button>
        <button
          onClick={handleExport}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Export List
        </button>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">List of Users</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
