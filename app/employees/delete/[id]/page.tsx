"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function DeleteEmployeePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);

  // Simular carga de datos del empleado por ID
  useEffect(() => {
    const mockEmployee: Employee = {
      id: parseInt(params.id),
      name: "John Doe",
      email: "john@example.com",
      role: "Supervisor",
    };

    setEmployee(mockEmployee);
  }, [params.id]);

  const handleDelete = () => {
    console.log(`Employee with ID ${params.id} deleted`);
    alert(`Employee "${employee?.name}" deleted successfully!`);
    router.push("/employees");
  };

  const handleCancel = () => {
    router.push("/employees");
  };

  if (!employee) {
    return <p>Loading employee data...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Delete Employee</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <p className="text-lg mb-4">
          Are you sure you want to delete <strong>{employee.name}</strong>?
        </p>
        <p className="text-sm text-gray-600 mb-6">This action cannot be undone.</p>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Confirm Delete
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
