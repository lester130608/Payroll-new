"use client";

import { useRouter } from "next/navigation";

const mockUsers = [
  { id: 1, name: "María López", role: "Supervisor", status: "Active" },
  { id: 2, name: "Juan Pérez", role: "Employee", status: "Active" },
  { id: 3, name: "Laura Gómez", role: "Administrator", status: "Inactive" },
];

export default function ModifyUserPage() {
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Modify User</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">
                {user.role} - {user.status}
              </p>
            </div>
            <button
              onClick={() => router.push(`/users/modify/${user.id}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Modify
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
