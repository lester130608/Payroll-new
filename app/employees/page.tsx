"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getAllEmployeesNew } from "@/lib/payrollServiceNew";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  supervisor_id: string | null;
  employee_type: string;
}

export default function EmployeesPage() {
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (status === "loading") return;
      if (!session?.user) {
        console.error("Session or user data is missing.");
        return;
      }

      try {
        const data = await getAllEmployeesNew(session.user.role, session.user.id);
        setEmployees(data || []);
      } catch (error) {
        console.error("❌ Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [session, status]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      {/* Botón para crear empleados, visible para admin y supervisores */}
      {session?.user?.role &&
      typeof session.user.role === "string" &&
      (session.user.role === "admin" || session.user.role.includes("supervisor")) ? (
        <div className="mb-4">
          <Link
            href="/employees/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            New Employee
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl bg-white p-6">
        <div className="overflow-x-auto rounded-2xl">
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left text-gray-700 font-semibold">Name</th>
                <th className="p-4 text-left text-gray-700 font-semibold">Email</th>
                <th className="p-4 text-left text-gray-700 font-semibold">Role</th>
                <th className="p-4 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">{employee.name}</td>
                    <td className="p-4 text-gray-600">{employee.email}</td>
                    <td className="p-4 text-gray-600">{employee.employee_type}</td>
                    <td className="p-4">
                      <Link
                        href={`/employees/modify/${employee.id}`}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Modify
                      </Link>
                      <Link
                        href={`/employees/delete/${employee.id}`}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}