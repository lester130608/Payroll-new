"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const mockEmployees = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
];

export default function DeleteEmployeePage() {
  const router = useRouter();

  const [employees] = useState(mockEmployees);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Delete Employee</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} className="mb-4">
            <button
              onClick={() => router.push(`/employees/delete/${employee.id}`)}
              className="text-red-600 hover:underline"
            >
              {employee.name} ({employee.email})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
