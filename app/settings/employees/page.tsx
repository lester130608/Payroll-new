"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllEmployees } from "@/lib/settingsService";

export default function EmployeesSettingsPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((data) => setEmployees(data)); // ✅ CORREGIDO
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employee Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">NAME</th>
              <th className="border px-4 py-2">ROLE</th>
              <th className="border px-4 py-2">EMPLOYMENT TYPE</th>
              <th className="border px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border px-4 py-2">{employee.name}</td>
                  <td className="border px-4 py-2">{employee.employee_type}</td>
                  <td className="border px-4 py-2">{employee.employment_type}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => router.push(`/settings/employee/${employee.id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border px-4 py-2 text-center text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}