"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
}

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState<Employee>({
    id: parseInt(params.id),
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  // Simulamos cargar los datos del empleado
  useEffect(() => {
    const mockEmployee: Employee = {
      id: parseInt(params.id),
      name: "John Doe",
      email: "john@example.com",
      role: "Supervisor",
      phone: "123-456-7890",
    };
    setEmployeeData(mockEmployee);
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee Updated:", employeeData);
    alert("Employee updated successfully!");
    router.push("/employees");
  };

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
          <label className="block font-medium">Role</label>
          <select name="role" value={employeeData.role} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Administrator">Administrator</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Employee">Employee</option>
            <option value="TCM">TCM</option>
            <option value="Clinicians">Clinicians</option>
            <option value="RBT">RBT</option>
            <option value="BCaBA">BCaBA</option>
            <option value="BCBA">BCBA</option>
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
          Update Employee
        </button>
      </form>
    </div>
  );
}
