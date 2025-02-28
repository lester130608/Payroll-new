"use client";

import { useState } from "react";

interface Employee {
  id: string;
  name: string;
}

interface PayrollData {
  employee_id: string;
  hours: number;
}

export default function PayrollFormBA({ employees, onSave, onSubmit }) {
  const [payrollData, setPayrollData] = useState<PayrollData[]>([]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">BA Payroll Form</h2>
      {employees.length > 0 ? (
        employees.map((employee) => (
          <div key={employee.id} className="mb-2">
            <span>{employee.name}</span>
            <input
              type="number"
              className="ml-2 border p-1 w-16"
              placeholder="Hours"
              onChange={(e) => {
                const updatedPayroll = [...payrollData];
                const entryIndex = updatedPayroll.findIndex((p) => p.employee_id === employee.id);
                if (entryIndex !== -1) {
                  updatedPayroll[entryIndex].hours = parseInt(e.target.value, 10);
                } else {
                  updatedPayroll.push({ employee_id: employee.id, hours: parseInt(e.target.value, 10) });
                }
                setPayrollData(updatedPayroll);
              }}
            />
          </div>
        ))
      ) : (
        <p>No employees found.</p>
      )}
      <button onClick={() => onSave(payrollData)} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
        Save Payroll
      </button>
      <button onClick={() => onSubmit(payrollData)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Submit Payroll
      </button>
    </div>
  );
}