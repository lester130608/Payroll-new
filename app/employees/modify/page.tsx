"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const employeesMock = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Supervisor", phone: "123-456-7890" },
  { id: 2, name: "Alice Smith", email: "alice@example.com", role: "Employee", phone: "234-567-8901" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Clinicians", phone: "345-678-9012" },
];

export default function ModifyEmployeePage() {
  const router = useRouter();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  const handleSelectEmployee = (id: number) => {
    const employee = employeesMock.find((emp) => emp.id === id);
    if (employee) {
      setSelectedEmployeeId(employee.id);
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        phone: employee.phone,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee Updated:", formData);
    alert("Employee updated successfully!");
    router.push("/employees");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Modify Employee</h1>

      {!selectedEmployeeId ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Select an Employee to Modify:</h2>
          <ul>
            {employeesMock.map((employee) => (
              <li key={employee.id} className="mb-2">
                <button
                  onClick={() => handleSelectEmployee(employee.id)}
                  className="text-blue-600 underline"
                >
                  {employee.name} ({employee.role})
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
          <div className="mb-4">
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
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
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Employee
          </button>
        </form>
      )}
    </div>
  );
}
