"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const mockUserData = {
  name: "María López",
  email: "maria@example.com",
  role: "Supervisor",
  phone: "123-456-7890",
  status: "Active",
};

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [userData, setUserData] = useState(mockUserData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated User:", { id, ...userData });
    alert("User updated successfully!");
    router.push("/users");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Modify User (ID: {id})</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Administrator">Administrator</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={userData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.push("/users")}
            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
