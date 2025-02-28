"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormClinicians from "@/components/PayrollFormClinicians"; // ✅ Asegúrate de que esté bien escrito

export default function CreateCliniciansPayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (session?.user) {
      console.log("📌 Rol del usuario en sesión:", session.user.role);
      console.log("📌 ID del usuario en sesión:", session.user.id);

      getEmployeesForSupervisor(session.user.id, session.user.role).then((employees) => {
        console.log("📌 Empleados recibidos en Clinicians Payroll:", employees);
        setEmployees(employees);
      });
    }
  }, [session]);

  const handleSave = (data: any) => {
    console.log("Clinicians Payroll saved as Draft:", data);
    alert("Payroll saved successfully!");
  };

  const handleSubmit = (data: any) => {
    console.log("Clinicians Payroll submitted as Final:", data);
    alert("Payroll submitted successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Clinicians Payroll</h1>
      <PayrollFormClinicians employees={employees} onSave={handleSave} onSubmit={handleSubmit} />
    </div>
  );
}