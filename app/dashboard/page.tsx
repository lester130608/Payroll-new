"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [inactiveEmployees, setInactiveEmployees] = useState(0);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (status === "loading") return;
      if (!session?.user) {
        console.error("Session or user data is missing.");
        return;
      }

      let query = supabase.from("employees").select("id, status");

      if (session.user && "role" in session.user && session.user.role?.includes("supervisor")) {
        query = query.eq("supervisor_id", session.user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching employee data:", error.message);
      } else {
        setEmployeeCount(data.length);
        setActiveEmployees(data.filter(emp => emp.status === "active").length);
        setInactiveEmployees(data.filter(emp => emp.status === "inactive").length);
      }
    };

    fetchEmployeeData();
  }, [session, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session?.user) return <p>Unauthorized</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session.user && "role" in session.user && session.user.role === "admin" ? "Admin" : "Supervisor"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Total Employees</h2>
          <p className="text-2xl font-bold">{employeeCount}</p>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-green-800">Active Employees</h2>
          <p className="text-2xl font-bold text-green-900">{activeEmployees}</p>
        </div>

        <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-800">Inactive Employees</h2>
          <p className="text-2xl font-bold text-red-900">{inactiveEmployees}</p>
        </div>
      </div>

      {session.user && "role" in session.user && session.user.role === "admin" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Reports</h2>
            <p>Access all reports and analytics.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Settings</h2>
            <p>Manage system configurations.</p>
          </div>
        </div>
      )}

      {session.user && "role" in session.user && session.user.role?.includes("supervisor") && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Productivity Summary</h2>
          <p>See the latest employee performance stats.</p>
        </div>
      )}
    </div>
  );
}