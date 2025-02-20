"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  supervisor_id: string | null;
}

export default function EmployeesPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!session?.user) return;

      let query = supabase.from("employees").select("*").eq("status", "active");

      if (session.user.role !== "admin") {
        query = query.eq("supervisor_id", session.user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching employees:", error.message);
      } else {
        setEmployees(data || []);
      }
    };

    fetchEmployees();
  }, [session]);

  // Filtrar empleados en base a búsqueda y rol
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterRole ? employee.role === filterRole : true)
  );

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="supervisor">Supervisor</option>
          <option value="employee">Employee</option>
        </select>

        <Link
          href="/employees/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          New Employee
        </Link>
      </div>

      <div className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
        <div className="overflow-x-auto rounded-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-white">
                  <tr>
                    <th className="p-4 lg:p-5 text-left text-gray-700 font-semibold">Name</th>
                    <th className="p-4 lg:p-5 text-left text-gray-700 font-semibold">Email</th>
                    <th className="p-4 lg:p-5 text-left text-gray-700 font-semibold">Role</th>
                    <th className="p-4 lg:p-5 text-left text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50 transition">
                        <td className="p-4 lg:p-5 text-gray-900">{employee.name}</td>
                        <td className="p-4 lg:p-5 text-gray-600">{employee.email}</td>
                        <td className="p-4 lg:p-5 text-gray-600">{employee.role}</td>
                        <td className="p-4 lg:p-5">
                          <Link
                            href={`/employees/modify/${employee.id}`}
                            className="text-yellow-600 hover:text-yellow-800 mr-2"
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
                      <td colSpan={4} className="p-4 lg:p-5 text-center text-gray-500">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}