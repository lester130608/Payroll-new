"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormEmployee from "@/components/PayrollFormEmployee";

export default function CreateEmployeePayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<{ id: string; name: string; rate: number }[]>([]);

  useEffect(() => {
    if (session?.user) {
      console.log("📌 Rol del usuario en sesión:", session.user.role);
      console.log("📌 ID del usuario en sesión:", session.user.id);

      getEmployeesForSupervisor(session.user.id, "admin").then((data) => {
        console.log("📌 Empleados recibidos en Employee Payroll:", data);
        setEmployees(data);
      });
    }
  }, [session]);

  const handleSave = (data: any) => {
    console.log("Employee Payroll saved as Draft:", data);
    alert("Payroll saved successfully!");
  };

  const handleSubmit = (data: any) => {
    const hasErrors = data.some(
      (entry: any) => !entry.hours || parseFloat(entry.hours) <= 0
    );

    if (hasErrors) {
      alert("Please enter valid hours before submitting.");
      return;
    }

    console.log("Employee Payroll submitted as Final:", data);
    alert("Payroll submitted successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Employee Payroll</h1>
      <PayrollFormEmployee employees={employees} onSave={handleSave} onSubmit={handleSubmit} />
    </div>
  );
}