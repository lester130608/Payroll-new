"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: string;
  name: string;
  rate: number;
}

interface PayrollEntry {
  employee_id: string;
  hours: string;
  total_pay: number;
}

export default function PayrollFormEmployee({ employees, onSave, onSubmit }) {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);

  // 📌 Mostrar en consola los empleados recibidos
  useEffect(() => {
    console.log("📌 Empleados recibidos en PayrollFormEmployee:", employees);
    if (employees.length > 0) {
      setPayrollData(
        employees.map((emp) => ({
          employee_id: emp.id,
          hours: "",
          total_pay: 0,
        }))
      );
    }
  }, [employees]);

  const handleChange = (index: number, field: keyof PayrollEntry, value: string) => {
    const updatedPayroll = [...payrollData];
    updatedPayroll[index][field] = value;

    // Calcular `total_pay` automáticamente
    const employee = employees.find((e) => e.id === updatedPayroll[index].employee_id);
    if (employee) {
      updatedPayroll[index].total_pay = parseFloat(value) * employee.rate;
    }

    setPayrollData(updatedPayroll);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">NAME</th>
            <th className="border px-4 py-2">HOURS</th>
            <th className="border px-4 py-2">TOTAL PAY</th>
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
                <td className="border px-4 py-2">{entry.total_pay.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border px-4 py-2 text-center text-gray-500">
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