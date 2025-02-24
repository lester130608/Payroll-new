"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollForm from "@/components/PayrollForm";

export default function CreateBAPayrollPage() {
  const { data: session, status } = useSession();
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (session?.user) {
      console.log("📌 Rol del usuario en sesión:", session.user.role);
      console.log("📌 ID del usuario en sesión:", session.user.id);

      getEmployeesForSupervisor(session.user.id, session.user.role).then((data) => {
        console.log("📌 Empleados recibidos en BA Payroll:", data);
        setEmployees(data);
      });
    }
  }, [session]);

  const handleSave = (data: any) => {
    console.log("BA Payroll saved as Draft:", data);
    alert("Payroll saved successfully!");
  };

  const handleSubmit = (data: any) => {
    const hasErrors = data.some(
      (entry: any) =>
        !entry.hours ||
        parseFloat(entry.hours) <= 0 ||
        (entry.services_completed && entry.services_completed.trim() === "")
    );

    if (hasErrors) {
      alert("Please enter valid hours and services before submitting.");
      return;
    }

    console.log("BA Payroll submitted as Final:", data);
    alert("Payroll submitted successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create BA Payroll</h1>
      <PayrollForm employees={employees} employeeType="ba" onSave={handleSave} onSubmit={handleSubmit} />
    </div>
  );
}