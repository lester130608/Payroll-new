"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

interface PayrollEntry {
  id: string;
  employee_name: string;
  employee_type: string;
  date: string;
  hours_worked: number;
  services_completed: string;
  status: string;
}

export default function PayrollTotalPage() {
  const { data: session, status } = useSession();
  const [payrollData, setPayrollData] = useState<PayrollEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchPayrollData = async () => {
      if (status === "loading") return;
      if (!session?.user) {
        console.error("Session or user data is missing.");
        return;
      }

      setLoading(true);

      let query = supabase
        .from("payroll")
        .select("id, employees(name, employee_type), date, hours_worked, services_completed, status");

      if (filterStatus) {
        query = query.eq("status", filterStatus);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching payroll data:", error.message);
      } else {
        setPayrollData(
          data.map((entry) => ({
            id: entry.id,
            employee_name: entry.employees.name,
            employee_type: entry.employees.employee_type,
            date: entry.date,
            hours_worked: entry.hours_worked,
            services_completed: entry.services_completed || "N/A",
            status: entry.status,
          }))
        );
      }
      setLoading(false);
    };

    fetchPayrollData();
  }, [session, status, filterStatus]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payroll Summary</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white p-6 shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 border">Employee</th>
                <th className="p-4 border">Type</th>
                <th className="p-4 border">Date</th>
                <th className="p-4 border">Hours</th>
                <th className="p-4 border">Services</th>
                <th className="p-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.length > 0 ? (
                payrollData.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="p-4 border">{entry.employee_name}</td>
                    <td className="p-4 border">{entry.employee_type}</td>
                    <td className="p-4 border">{entry.date}</td>
                    <td className="p-4 border">{entry.hours_worked}</td>
                    <td className="p-4 border">{entry.services_completed}</td>
                    <td
                      className={`p-4 border ${
                        entry.status === "approved" ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {entry.status.toUpperCase()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No payroll records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}