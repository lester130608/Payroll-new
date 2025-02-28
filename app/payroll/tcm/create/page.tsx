"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormTCM from "@/components/PayrollFormTCM";

interface Employee {
  id: string;
  name: string;
}

export default function CreateTCMPayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (session?.user) {
      console.log("📌 Rol del usuario en sesión:", session.user.role);
      console.log("📌 ID del usuario en sesión:", session.user.id);

      getEmployeesForSupervisor(session.user.id, session.user.role).then((employees) => {
        console.log("📌 Empleados recibidos en TCM Payroll:", employees);
        setEmployees(employees);
      });
    }
  }, [session]);

  const handleSave = (data: Employee[]) => {
    console.log("TCM Payroll saved as Draft:", data);
    alert("Payroll saved successfully!");
  };

  const handleSubmit = (data: Employee[]) => {
    console.log("TCM Payroll submitted as Final:", data);
    alert("Payroll submitted successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create TCM Payroll</h1>
      <PayrollFormTCM employees={employees} onSave={handleSave} onSubmit={handleSubmit} />
    </div>
  );
}