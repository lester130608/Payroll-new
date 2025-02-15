"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEmployeePage() {
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    role: "Supervisor",
    status: "Active",
    phone: "",
    employeeType: "", // Solo aplicable para RBT, BCaBA, BCBA, TCM, Clinicians
    supervisorType: "", // Solo aplicable para Supervisores
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee Created:", employeeData);
    setIsSubmitted(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create New Employee</h1>

      {!isSubmitted ? (
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
            <label className="block font-medium">Role</label>
            <select name="role" value={employeeData.role} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Administrator">Administrator</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Employee">Employee</option>
              <option value="RBT">RBT</option>
              <option value="BCaBA">BCaBA</option>
              <option value="BCBA">BCBA</option>
              <option value="TCM">TCM</option>
              <option value="Clinicians">Clinicians</option>
            </select>
          </div>

          {/* Si el rol es Supervisor, mostramos el tipo de supervisor */}
          {employeeData.role === "Supervisor" && (
            <div className="mb-4">
              <label className="block font-medium">Supervisor Type</label>
              <select
                name="supervisorType"
                value={employeeData.supervisorType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Supervisor Type</option>
                <option value="TCM Supervisor">TCM Supervisor</option>
                <option value="Clinicians Supervisor">Clinicians Supervisor</option>
                <option value="BA Supervisor">BA Supervisor</option>
              </select>
            </div>
          )}

          {/* Si selecciona RBT, BCaBA, BCBA, TCM, Clinicians, mostramos el tipo de empleado */}
          {["RBT", "BCaBA", "BCBA", "TCM", "Clinicians"].includes(employeeData.role) && (
            <div className="mb-4">
              <label className="block font-medium">Type of Employee</label>
              <select
                name="employeeType"
                value={employeeData.employeeType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Employee Type</option>
                <option value="RBT">RBT</option>
                <option value="BCaBA">BCaBA</option>
                <option value="BCBA">BCBA</option>
                <option value="TCM">TCM</option>
                <option value="Clinicians">Clinicians</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block font-medium">Status</label>
            <select name="status" value={employeeData.status} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Create Employee
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Employee Created Successfully!</h2>
          <p className="text-gray-600 mb-6">What would you like to do next?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Create Another
            </button>
            <button
              onClick={() => router.push("/employees")}
              className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            >
              Back to Employees
            </button>
          </div>
        </div>
      )}
    </div>
  );
}