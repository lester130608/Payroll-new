"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface EmployeeEntry {
  id: number;
  name: string;
  weeks: { date: string; hours: string }[];
}

export default function NewPayrollPage() {
  const router = useRouter();

  const initialEmployees: EmployeeEntry[] = [
    { id: 1, name: "Juan Pérez", weeks: [{ date: "", hours: "" }] },
    { id: 2, name: "María López", weeks: [{ date: "", hours: "" }] },
  ];

  const [employees, setEmployees] = useState<EmployeeEntry[]>(initialEmployees);

  const handleChange = (empId: number, weekIndex: number, field: string, value: string) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === empId) {
        const updatedWeeks = emp.weeks.map((week, idx) =>
          idx === weekIndex ? { ...week, [field]: value } : week
        );
        return { ...emp, weeks: updatedWeeks };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
  };

  const addWeek = (empId: number) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === empId) {
        return { ...emp, weeks: [...emp.weeks, { date: "", hours: "" }] };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
  };

  const handleSavePayroll = () => {
    console.log("Payroll Guardado:", employees);
    alert("Payroll guardado correctamente.");
    router.push("/payroll"); // Opcional: redirigir a la página de Payroll
  };

  const handleSubmitPayroll = () => {
    console.log("Payroll Enviado:", employees);
    alert("Payroll enviado correctamente.");
    router.push("/payroll"); // Opcional: redirigir a la página de Payroll
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">New Payroll</h1>

      <div className="space-y-8">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{employee.name}</h2>

            {employee.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-medium">Date</label>
                  <input
                    type="date"
                    value={week.date}
                    onChange={(e) => handleChange(employee.id, weekIndex, "date", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block font-medium">Hours</label>
                  <input
                    type="number"
                    value={week.hours}
                    onChange={(e) => handleChange(employee.id, weekIndex, "hours", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addWeek(employee.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ➕ Add Week
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSavePayroll}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Save Payroll
        </button>

        <button
          onClick={handleSubmitPayroll}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Payroll
        </button>
      </div>
    </div>
  );
}
