"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: string;
  name: string;
}

interface PayrollEntry {
  employee_id: string;
  it: string;
  bio: string;
  tp: string;
  intake: string;
  in_depth_bio: string;
  in_depth_intake: string;
  in_depth_existing: string;
  tp_review: string;
}

export default function PayrollFormClinicians({ employees, onSave, onSubmit }) {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);

  // 📌 Mostrar en consola los empleados recibidos
  useEffect(() => {
    console.log("📌 Empleados recibidos en PayrollFormClinicians:", employees);
    if (employees.length > 0) {
      setPayrollData(
        employees.map((emp) => ({
          employee_id: emp.id,
          it: "",
          bio: "",
          tp: "",
          intake: "",
          in_depth_bio: "",
          in_depth_intake: "",
          in_depth_existing: "",
          tp_review: "",
        }))
      );
    }
  }, [employees]);

  const handleChange = (index: number, field: keyof PayrollEntry, value: string) => {
    const updatedPayroll = [...payrollData];
    updatedPayroll[index][field] = value;
    setPayrollData(updatedPayroll);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-green-300">
          <tr>
            <th className="border px-4 py-2">NAME</th>
            <th className="border px-4 py-2">IT</th>
            <th className="border px-4 py-2">BIO</th>
            <th className="border px-4 py-2">TP</th>
            <th className="border px-4 py-2">INTAKE</th>
            <th className="border px-4 py-2">IN-DEPTH BIO</th>
            <th className="border px-4 py-2">IN-DEPTH INTAKE</th>
            <th className="border px-4 py-2">IN-DEPTH EXISTING</th>
            <th className="border px-4 py-2">TP REVIEW</th>
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
                    value={entry.it}
                    onChange={(e) => handleChange(index, "it", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={entry.bio}
                    onChange={(e) => handleChange(index, "bio", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={entry.tp}
                    onChange={(e) => handleChange(index, "tp", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={entry.intake}
                    onChange={(e) => handleChange(index, "intake", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={entry.in_depth_bio}
                    onChange={(e) => handleChange(index, "in_depth_bio", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={entry.in_depth_intake}
                    onChange={(e) => handleChange(index, "in_depth_intake", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={entry.in_depth_existing}
                    onChange={(e) => handleChange(index, "in_depth_existing", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={entry.tp_review}
                    onChange={(e) => handleChange(index, "tp_review", e.target.value)}
                    className="border p-1 w-16"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="border px-4 py-2 text-center text-gray-500">
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