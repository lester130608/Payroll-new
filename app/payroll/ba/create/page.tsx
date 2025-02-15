"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Simulación de empleados y sus tipos
const employees = [
  { name: "Employee 1", type: "RBT" },
  { name: "Employee 2", type: "BCaBA" },
  { name: "Employee 3", type: "RBT" },
  { name: "Employee 4", type: "BCBA" },
  { name: "Employee 5", type: "BCaBA" },
];

export default function CreateBAPayrollPage() {
  const router = useRouter();

  const [payrollData, setPayrollData] = useState(
    employees.map((emp) => ({
      name: emp.name,
      type: emp.type,
      hours: "",
      assessment: "",
      reassessment: "",
    }))
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAsFinal, setSubmittedAsFinal] = useState(false);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedData = [...payrollData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setPayrollData(updatedData);
  };

  const handleSavePayroll = () => {
    console.log("BA Payroll saved as Draft:", payrollData);
    alert("Payroll saved successfully!");
    router.push("/payroll");
  };

  const handleSubmitPayroll = () => {
    console.log("BA Payroll submitted as Final:", payrollData);
    alert("Payroll submitted successfully!");
    router.push("/payroll");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create BA Payroll</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="border border-gray-300 px-3 py-2">Employee Name</th>
              <th className="border border-gray-300 px-3 py-2">Type</th>
              <th className="border border-gray-300 px-3 py-2">Hours</th>
              <th className="border border-gray-300 px-3 py-2">Assessment</th>
              <th className="border border-gray-300 px-3 py-2">Reassessment</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-3 py-2">{row.name}</td>
                <td className="border border-gray-300 px-3 py-2">{row.type}</td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="number"
                    value={row.hours}
                    onChange={(e) => handleChange(index, "hours", e.target.value)}
                    className="border p-1 rounded w-20"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {row.type !== "RBT" && (
                    <input
                      type="number"
                      value={row.assessment}
                      onChange={(e) => handleChange(index, "assessment", e.target.value)}
                      className="border p-1 rounded w-20"
                    />
                  )}
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  {row.type !== "RBT" && (
                    <input
                      type="number"
                      value={row.reassessment}
                      onChange={(e) => handleChange(index, "reassessment", e.target.value)}
                      className="border p-1 rounded w-20"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleSavePayroll}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save Payroll
          </button>
          <button
            type="button"
            onClick={handleSubmitPayroll}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Payroll
          </button>
        </div>
      </div>
    </div>
  );
}
