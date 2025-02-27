"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEmployeePayroll, updateEmployeePayroll } from "@/lib/payrollService";

export default function ModifyPayrollPage() {
  const router = useRouter();
  const { id } = useParams();
  const [employee, setEmployee] = useState({ name: "", total_pay: "" });

  useEffect(() => {
    getEmployeePayroll(id).then((data) => {
      setEmployee(data);
    });
  }, [id]);

  const handleSave = async () => {
    await updateEmployeePayroll(id, employee);
    alert("Payroll updated successfully!");
    router.push("/payroll/total");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Modify Payroll</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block text-gray-700">Employee Name</label>
        <input
          type="text"
          value={employee.name}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          readOnly
        />

        <label className="block text-gray-700 mt-4">Total Pay</label>
        <input
          type="number"
          value={employee.total_pay}
          onChange={(e) => setEmployee({ ...employee, total_pay: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}