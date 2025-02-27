"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEmployeeById, updateEmployee } from "@/lib/settingsService"; // ✅ Corrección aquí

export default function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    employee_type: "",
    employment_type: "",
  });

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((data) => {
        if (data) setEmployee(data);
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const success = await updateEmployee(id, employee);
    if (success) {
      alert("Employee updated successfully!");
      router.push("/settings/employees");
    } else {
      alert("Failed to update employee.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Employee</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            name="employee_type"
            value={employee.employee_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Employment Type</label>
          <select
            name="employment_type"
            value={employee.employment_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="W-2">W-2</option>
            <option value="1099">1099</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}