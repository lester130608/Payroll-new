"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormEmployee, { Employee, PayrollEntry } from "@/components/PayrollFormEmployee"; // 🔹 Importamos PayrollEntry también

export default function CreateEmployeePayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const userId = session?.user?.id;
    const userRole = session?.user?.role;

    if (userId && userRole) {
      getEmployeesForSupervisor(userId, userRole)
        .then((data) => setEmployees(data as Employee[])) // 🔹 Asegurar que el tipo coincida
        .catch((error) => console.error("Error al obtener empleados:", error));
    }
  }, [session?.user?.id, session?.user?.role]);

  const handleSave = (data: PayrollEntry[]) => {
    console.log("Saving payroll data:", data);
    // 🔹 Aquí puedes agregar lógica para guardar los datos en Supabase
  };

  const handleSubmit = (data: PayrollEntry[]) => {
    console.log("Submitting payroll data:", data);
    // 🔹 Aquí puedes agregar lógica para enviar los datos a una API
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Employee Payroll</h1>
      <PayrollFormEmployee 
        employees={employees} 
        onSave={handleSave} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}