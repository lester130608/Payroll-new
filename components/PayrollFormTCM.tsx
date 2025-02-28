"use client";

import { useEffect, useState } from "react";

export interface Employee {
  id: string;
  name: string;
}

export interface PayrollEntry {
  employee_id: string;
  hours: string;
  date: string;
}

interface PayrollFormProps {
  employees: Employee[];
  onSave: (data: PayrollEntry[]) => void;
  onSubmit: (data: PayrollEntry[]) => void;
}

export default function PayrollFormTCM({ employees = [], onSave, onSubmit }: PayrollFormProps) {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);

  // Inicializar payrollData cuando `employees` cambie
  useEffect(() => {
    if (employees.length === 0) return; // 🔹 Evitar re-render innecesario

    setPayrollData(
      employees.map((emp) => ({
        employee_id: emp.id,
        hours: "",
        date: "",
      }))
    );
  }, [employees]);

  const handleChange = (index: number, field: keyof PayrollEntry, value: string) => {
    setPayrollData((prev) =>
      prev.map((entry, i) =>
        i === index
          ? {
              ...entry,
              [field]: field === "hours" ? value.replace(/[^0-9]/g, "") : value, // 🔹 Validar que `hours` sea solo números
            }
          : entry
      )
    );
  };

  const handleAddWeek = (index: number) => {
    if (index < 0 || index >= payrollData.length) return; // 🔹 Evitar errores de índice
    const currentEntry = payrollData[index];

    setPayrollData((prev) => [
      ...prev.slice(0, index + 1),
      {
        employee_id: currentEntry.employee_id,
        hours: "",
        date: "",
      },
      ...prev.slice(index + 1),
    ]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Hours</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Add Week</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.length > 0 ? (
            payrollData.map((entry, index) => (
              <tr key={`${entry.employee_id}-${index}`}>
                <td className="border px-4 py-2">{employees[index]?.name || "Unknown"}</td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    value={entry.hours}
                    onChange={(e) => handleChange(index, "hours", e.target.value)}
                    className="border p-1 w-20"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                    className="border p-1"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleAddWeek(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    +
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

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => onSave(payrollData)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Save Payroll
        </button>
        <button
          type="button"
          onClick={() => onSubmit(payrollData)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Payroll
        </button>
      </div>
    </div>
  );
}