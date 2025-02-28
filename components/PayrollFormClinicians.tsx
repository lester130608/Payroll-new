"use client";

import { useEffect, useState } from "react";

export interface PayrollEntry {
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

interface Employee {
  id: string;
  name: string;
}

interface PayrollFormProps {
  employees: Employee[];
  onSave: (data: PayrollEntry[]) => void;
  onSubmit: (data: PayrollEntry[]) => void;
}

export default function PayrollFormClinicians({
  employees = [],
  onSave,
  onSubmit,
}: PayrollFormProps) {
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);

  useEffect(() => {
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
    setPayrollData((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry))
    );
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
              <tr key={`${entry.employee_id}-${index}`}>
                <td className="border px-4 py-2">{employees[index]?.name || "Unknown"}</td>
                {[
                  "it",
                  "bio",
                  "tp",
                  "intake",
                  "in_depth_bio",
                  "in_depth_intake",
                  "in_depth_existing",
                  "tp_review",
                ].map((field) => (
                  <td key={field} className="border px-4 py-2">
                    <input
                      type="number"
                      value={entry[field as keyof PayrollEntry]}
                      onChange={(e) => handleChange(index, field as keyof PayrollEntry, e.target.value)}
                      className="border p-1 w-16"
                      min="0"
                    />
                  </td>
                ))}
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