import { useEffect, useState } from "react";

interface PayrollFormProps {
  employees: { id: string; name: string; employee_type: string }[];
  employeeType: string;
  onSave: (data: any) => void;
  onSubmit: (data: any) => void;
}

export default function PayrollForm({ employees, employeeType, onSave, onSubmit }: PayrollFormProps) {
  const [payrollData, setPayrollData] = useState(
    employees.map((emp) => ({
      employee_id: emp.id,
      name: emp.name,
      employee_type: emp.employee_type, // Se agrega para diferenciar RBT de otros
      hours: "",
      assessment: "",
      reassessment: "",
      date: "",
    }))
  );

  useEffect(() => {
    console.log("📌 Empleados actualizados en PayrollForm:", employees);
    setPayrollData(
      employees.map((emp) => ({
        employee_id: emp.id,
        name: emp.name,
        employee_type: emp.employee_type,
        hours: "",
        assessment: "",
        reassessment: "",
        date: "",
      }))
    );
  }, [employees]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200 text-sm">
            <th className="border border-gray-300 px-3 py-2">Employee Name</th>
            <th className="border border-gray-300 px-3 py-2">Hours</th>
            <th className="border border-gray-300 px-3 py-2">Assessment</th>
            <th className="border border-gray-300 px-3 py-2">Reassessment</th>
            <th className="border border-gray-300 px-3 py-2">Date</th>
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
                  onChange={(e) => {
                    const updatedData = [...payrollData];
                    updatedData[index].hours = e.target.value;
                    setPayrollData(updatedData);
                  }}
                  className="border p-1 rounded w-20"
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <input
                  type="number"
                  value={row.assessment}
                  onChange={(e) => {
                    const updatedData = [...payrollData];
                    updatedData[index].assessment = e.target.value;
                    setPayrollData(updatedData);
                  }}
                  className="border p-1 rounded w-20"
                  disabled={row.employee_type === "rbt"} // 🔹 Se bloquea para RBT
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <input
                  type="number"
                  value={row.reassessment}
                  onChange={(e) => {
                    const updatedData = [...payrollData];
                    updatedData[index].reassessment = e.target.value;
                    setPayrollData(updatedData);
                  }}
                  className="border p-1 rounded w-20"
                  disabled={row.employee_type === "rbt"} // 🔹 Se bloquea para RBT
                />
              </td>
              <td className="border border-gray-300 px-3 py-2">
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => {
                    const updatedData = [...payrollData];
                    updatedData[index].date = e.target.value;
                    setPayrollData(updatedData);
                  }}
                  className="border p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => onSave(payrollData)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Save Payroll
        </button>
        <button
          type="button"
          onClick={() => onSubmit(payrollData)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Payroll
        </button>
      </div>
    </div>
  );
}