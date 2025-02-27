"use client";

import { useEffect, useState } from "react";
import { getEmployeePayroll } from "@/lib/payrollService";

export default function PayrollEmployeePage() {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    async function fetchPayroll() {
      const data = await getEmployeePayroll();
      setPayrollData(data);
    }
    fetchPayroll();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payroll Employee</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">NAME</th>
              <th className="border px-4 py-2">ROLE</th>
              <th className="border px-4 py-2">EMPLOYMENT TYPE</th>
              <th className="border px-4 py-2">RATE</th>
              <th className="border px-4 py-2">TOTAL PAY</th>
              <th className="border px-4 py-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.length > 0 ? (
              payrollData.map((payroll) => (
                <tr key={payroll.id}>
                  <td className="border px-4 py-2">{payroll.employee_name}</td>
                  <td className="border px-4 py-2">{payroll.employee_type}</td>
                  <td className="border px-4 py-2">{payroll.employment_type}</td>
                  <td className="border px-4 py-2">{payroll.rate ? `$${payroll.rate}` : "N/A"}</td>
                  <td className="border px-4 py-2">{payroll.total_pay ? `$${payroll.total_pay}` : "N/A"}</td>
                  <td className="border px-4 py-2">{payroll.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border px-4 py-2 text-center text-gray-500">
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