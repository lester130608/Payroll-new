"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: string;
  name: string;
}

interface PayrollEntry {
  employee_id: string;
  hours: string;
}

export default function PayrollFormBA({ employees = [] }: { employees: Employee[] }) {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);

  useEffect(() => {
    if (employees.length > 0) {
      setPayrollData(employees.map((emp) => ({ employee_id: emp.id, hours: "" })));
    }
  }, [employees]);

  const handleHoursChange = (index: number, value: string) => {
    setPayrollData((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, hours: value } : entry))
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-green-300">
          <tr>
            <th className="border px-4 py-2">NAME</th>
            <th className="border px-4 py-2">HOURS</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.length > 0 ? (
            payrollData.map((entry, index) =>
              employees[index] ? (
                <tr key={employees[index]?.id || `row-${index}`}>
                  <td className="border px-4 py-2">{employees[index]?.name || "Unknown"}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={entry.hours}
                      onChange={(e) => handleHoursChange(index, e.target.value)}
                      className="border p-1 w-16"
                      min="0"
                    />
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan={2} className="border px-4 py-2 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}