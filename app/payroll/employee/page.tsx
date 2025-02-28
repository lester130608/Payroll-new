"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeePayroll, Payroll } from "@/lib/payrollService"; // 🔹 Importamos `Payroll`

export default function EmployeePayrollPage() {
  const { data: session } = useSession();
  const [payrollData, setPayrollData] = useState<Payroll[]>([]); // 🔹 Agregar el tipo correcto

  useEffect(() => {
    async function fetchPayroll() {
      if (!session?.user?.id) {
        console.error("❌ No se encontró el ID del usuario en la sesión.");
        return;
      }

      try {
        const data = await getEmployeePayroll(session.user.id); // 🔹 Se pasa `session.user.id`
        setPayrollData(data); // ✅ Ahora TypeScript reconocerá `Payroll[]`
      } catch (error) {
        console.error("❌ Error al obtener el payroll:", error);
      }
    }

    fetchPayroll();
  }, [session?.user?.id]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Employee Payroll</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {payrollData.length > 0 ? (
          <ul>
            {payrollData.map((entry) => (
              <li key={entry.id} className="border-b last:border-0 px-4 py-2">
                {entry.date}: {entry.hours_worked} hours, {entry.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No payroll data available.</p>
        )}
      </div>
    </div>
  );
}