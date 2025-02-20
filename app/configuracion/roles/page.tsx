"use client";

import { useEffect, useState } from "react";

export default function RolesPage() {
  const [roles, setRoles] = useState<string[]>([]);

  // Aquí en el futuro traeremos los roles desde Supabase, por ahora son estáticos.
  useEffect(() => {
    setRoles(["admin", "supervisor", "employee", "clinicians", "tcm", "ba"]);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Roles</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Role Name</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
