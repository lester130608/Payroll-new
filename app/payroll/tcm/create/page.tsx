"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

interface Employee {
  id: string;
  name: string;
}

interface PayrollEntry {
  employee_id: string;
  hours: string;
  date: string;
}

export default function CreateTCMPayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Traemos los empleados activos de ese supervisor
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from("employees")
        .select("id, name")
        .eq("status", "active")
        .eq("role", "TCM")
        .eq("supervisor_id", session.user.id);

      if (error) {
        console.error("Error fetching employees:", error.message);
      } else {
        setEmployees(data);
        setPayrollData(data.map((emp) => ({ employee_id: emp.id, hours: "", date: "" })));
      }
    };

    fetchEmployees();
  }, [session]);

  const handleChange = (index: number, field: keyof PayrollEntry, value: string) => {
    const updatedPayroll = [...payrollData];
    updatedPayroll[index][field] = value;
    setPayrollData(updatedPayroll);
  };

  const handleSubmit = async (final: boolean) => {
    const { error } = await supabase.from("payroll_tcm").insert(
      payrollData.map((entry) => ({
        ...entry,
        hours: entry.hours ? parseFloat(entry.hours) : null,
        submitted: final,
      }))
    );

    if (error) {
      console.error("Error submitting payroll:", error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create TCM Payroll</h1>

      {isSubmitted ? (
        <div className="text-center bg-white p-6 rounded shadow">
          <p className="text-green-600 font-semibold mb-4">Payroll Submitted Successfully!</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Employee</th>
                <th className="border px-4 py-2">Hours</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{employees.find((e) => e.id === entry.employee_id)?.name}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={entry.hours}
                      onChange={(e) => handleChange(index, "hours", e.target.value)}
                      className="border p-1 w-20"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="date"
                      value={entry.date}
                      onChange={(e) => handleChange(index, "date", e.target.value)}
                      className="border p-1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4">
            <button
              onClick={() => handleSubmit(false)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Save Payroll
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Payroll
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
