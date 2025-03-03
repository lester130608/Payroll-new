"use client";

import { useEffect, useState } from "react";
import { getTotalPayrollNew as getTotalPayroll, Payroll } from "@/lib/payrollServiceNew"; // 🔹 Importamos `Payroll`

export default function GeneralPayrollPage() {
  const [payrollData, setPayrollData] = useState<Payroll[]>([]); // 🔹 Definir correctamente el tipo

  useEffect(() => {
    getTotalPayroll().then((data) => setPayrollData(data)); // ✅ Ahora TypeScript reconocerá `Payroll[]`
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">General Payroll</h1>
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