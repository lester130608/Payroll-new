"use client";

import { useRouter } from "next/navigation";

const mockEmployees = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "RBT" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "BCBA" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Supervisor" },
];

export default function EmployeesPage() {
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => router.push("/employees/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Employee
        </button>
        <button
          onClick={() => router.push("/employees/modify")}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Modify Employee
        </button>
        <button
          onClick={() => router.push("/employees/delete")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Employee
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      <ul className="bg-white p-4 rounded shadow">
        {mockEmployees.map((employee) => (
          <li key={employee.id} className="border-b last:border-b-0 py-2">
            <p className="font-medium">{employee.name}</p>
            <p className="text-gray-600">{employee.email}</p>
            <p className="text-gray-600">Role: {employee.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
