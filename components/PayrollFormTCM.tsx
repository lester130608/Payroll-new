"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: string;
  name: string;
}

interface PayrollEntry {
  employee_id: string;
  hours: string;
  date: string;
}

export default function PayrollFormTCM({ employees, onSave, onSubmit }) {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);

  // 📌 Mostrar en consola los empleados recibidos
  useEffect(() => {
    console.log("📌 Empleados recibidos en PayrollFormTCM:", employees);
    if (employees.length > 0) {
      setPayrollData(
        employees.map((emp) => ({
          employee_id: emp.id,
          hours: "",
          date: "",
        }))
      );
    }
  }, [employees]);

  const handleChange = (index: number, field: keyof PayrollEntry, value: string) => {
    const updatedPayroll = [...payrollData];
    updatedPayroll[index][field] = value;
    setPayrollData(updatedPayroll);
  };

  const handleAddWeek = (index: number) => {
    const updatedPayroll = [...payrollData];
    updatedPayroll.splice(index + 1, 0, {
      employee_id: payrollData[index].employee_id,
      hours: "",
      date: "",
    });
    setPayrollData(updatedPayroll);
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
              <tr key={index}>
                <td className="border px-4 py-2">
                  {employees.find((e) => e.id === entry.employee_id)?.name}
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
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