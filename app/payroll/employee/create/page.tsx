"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

export default function CreateEmployeePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Employee",
    status: "active", // 👈 Minúsculas desde el inicio
    supervisor_type: "",
    employee_type: "",
    rate: "",
  });

  const [supervisorId, setSupervisorId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      if (employeeData.role === "Supervisor" || employeeData.role === "Employee") {
        setSupervisorId(session.user.id);
      } else if (employeeData.role === "RBT" || employeeData.role === "BCaBA" || employeeData.role === "BCBA") {
        fetchSupervisor("BA Supervisor");
      } else if (employeeData.role === "TCM") {
        fetchSupervisor("TCM Supervisor");
      } else if (employeeData.role === "Clinician") {
        fetchSupervisor("Clinicians Supervisor");
      }
    }
  }, [employeeData.role, session]);

  const fetchSupervisor = async (supervisorType: string) => {
    const { data, error } = await supabase
      .from("employees")
      .select("id")
      .eq("supervisor_type", supervisorType)
      .eq("status", "active") // 👈 También aquí en minúscula
      .limit(1)
      .single();

    if (data) {
      setSupervisorId(data.id);
    } else {
      console.error(`No supervisor found for ${supervisorType}`, error?.message);
      setSupervisorId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from("employees").insert([
      {
        ...employeeData,
        supervisor_id: supervisorId,
        rate: employeeData.rate ? parseFloat(employeeData.rate) : null,
      },
    ]);

    if (error) {
      console.error("Error creating employee:", error.message);
    } else {
      console.log("Employee Created:", data);
      router.push("/employees");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create New Employee</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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
            value={employeeData.phone}
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

        {employeeData.role === "Supervisor" && (
          <div className="mb-4">
            <label className="block font-medium">Supervisor Type</label>
            <select
              name="supervisor_type"
              value={employeeData.supervisor_type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="TCM Supervisor">TCM Supervisor</option>
              <option value="Clinicians Supervisor">Clinicians Supervisor</option>
              <option value="BA Supervisor">BA Supervisor</option>
            </select>
          </div>
        )}

        {["RBT", "BCaBA", "BCBA", "Employee", "TCM"].includes(employeeData.role) && (
          <div className="mb-4">
            <label className="block font-medium">Rate</label>
            <input
              type="number"
              name="rate"
              value={employeeData.rate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
            />
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
          Create Employee
        </button>
      </form>
    </div>
  );
}
