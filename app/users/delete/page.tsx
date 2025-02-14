"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const usersMockData = [
  { id: "1", name: "John Doe", role: "Administrator" },
  { id: "2", name: "Alice Smith", role: "Supervisor" },
  { id: "3", name: "Bob Johnson", role: "Employee" },
];

export default function DeleteUserPage() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const router = useRouter();

  const handleDelete = () => {
    if (!selectedUser) {
      alert("Please select a user to delete.");
      return;
    }

    // Simulación de eliminación
    console.log("User deleted:", selectedUser);

    // Simulación de notificación flotante (ejemplo simple)
    alert(`User with ID ${selectedUser} deleted successfully!`);

    // Redireccionar a la página de usuarios
    router.push("/users");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Delete User</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <label className="block font-medium mb-4">Select User to Delete</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-2 border rounded mb-6"
        >
          <option value="">-- Select User --</option>
          {usersMockData.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} - {user.role}
            </option>
          ))}
        </select>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
