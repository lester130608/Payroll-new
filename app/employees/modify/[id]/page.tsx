"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  employee_type: string | null;
  rate: number | null;
}

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", params.id)
        .single();

      if (data) {
        setEmployeeData(data);
      } else {
        console.error("Error fetching employee:", error?.message);
      }
    };

    fetchEmployee();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (employeeData) {
      setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeData) return;

    const { error } = await supabase
      .from("employees")
      .update({
        name: employeeData.name,
        email: employeeData.email,
        phone: employeeData.phone,
        role: employeeData.role,
        status: employeeData.status,
        employee_type: employeeData.employee_type,
        rate: employeeData.rate,
      })
      .eq("id", employeeData.id);

    if (error) {
      console.error("Error updating employee:", error.message);
    } else {
      alert("Employee updated successfully!");
      router.push("/employees");
    }
  };

  if (!employeeData) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Edit Employee</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
        <div className="mb-4">
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={employeeData.phone || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={employeeData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Supervisor">Supervisor</option>
            <option value="Employee">Employee</option>
            <option value="RBT">RBT</option>
            <option value="BCaBA">BCaBA</option>
            <option value="BCBA">BCBA</option>
            <option value="TCM">TCM</option>
            <option value="Clinician">Clinician</option>
          </select>
        </div>

        {["RBT", "BCaBA", "BCBA", "Employee", "TCM"].includes(employeeData.role) && (
          <div className="mb-4">
            <label className="block font-medium">Rate</label>
            <input
              type="number"
              name="rate"
              value={employeeData.rate || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
            />
          </div>
        )}

        {["RBT", "BCaBA", "BCBA"].includes(employeeData.role) && (
          <div className="mb-4">
            <label className="block font-medium">Type of Employee</label>
            <select
              name="employee_type"
              value={employeeData.employee_type || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="RBT">RBT</option>
              <option value="BCaBA">BCaBA</option>
              <option value="BCBA">BCBA</option>
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={employeeData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Employee
        </button>
      </form>
    </div>
  );
}
