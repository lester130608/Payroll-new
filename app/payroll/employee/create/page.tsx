"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Simulación de empleados "Employee"
const employees = [
  { name: "Employee 1" },
  { name: "Employee 2" },
  { name: "Employee 3" },
  { name: "Employee 4" },
];

export default function CreateEmployeePayrollPage() {
  const router = useRouter();

  const [payrollData, setPayrollData] = useState(
    employees.map((emp) => ({
      name: emp.name,
      hours: "",
    }))
  );

  const handleChange = (index: number, value: string) => {
    const updatedData = [...payrollData];
    updatedData[index].hours = value;
    setPayrollData(updatedData);
  };

  const handleSavePayroll = () => {
    console.log("Employee Payroll saved as Draft:", payrollData);
    alert("Payroll saved successfully!");
    router.push("/payroll");
  };

  const handleSubmitPayroll = () => {
    console.log("Employee Payroll submitted as Final:", payrollData);
    alert("Payroll submitted successfully!");
    router.push("/payroll");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create Employee Payroll</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <table className="w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="border border-gray-300 px-3 py-2">Employee Name</th>
              <th className="border border-gray-300 px-3 py-2">Hours</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-3 py-2">{row.name}</td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="number"
                    value={row.hours}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="border p-1 rounded w-20"
                  />
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
