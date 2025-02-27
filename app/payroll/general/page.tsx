"use client";

import { useEffect, useState } from "react";
import { getTotalPayroll } from "@/lib/payrollService";

export default function PayrollGeneralPage() {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    getTotalPayroll().then(setPayrollData);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payroll General</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Total Pay</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.length > 0 ? (
              payrollData.map((payroll) => (
                <tr key={payroll.id}>
                  <td className="border px-4 py-2">{payroll.name}</td>
                  <td className="border px-4 py-2">${payroll.total_pay.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="border px-4 py-2 text-center text-gray-500">
                  No payroll data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}