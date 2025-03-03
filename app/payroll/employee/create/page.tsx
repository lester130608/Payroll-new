"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormEmployee, { Employee, PayrollEntry } from "@/components/PayrollFormEmployee";

export default function CreateEmployeePayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const userId = session?.user?.id;
    const userRole = session?.user?.role;

    console.log("🔍 Usuario autenticado:", { userId, userRole });

    if (userId && userRole) {
      getEmployeesForSupervisor(userId, userRole)
        .then((data) => {
          console.log("✅ Empleados obtenidos:", data);
          setEmployees(data as Employee[]);
        })
        .catch((error) => console.error("❌ Error al obtener empleados:", error));
    }
  }, [session?.user?.id, session?.user?.role]);

  const handleSave = (data: PayrollEntry[]) => {
    console.log("💾 Guardando payroll:", data);
  };

  const handleSubmit = (data: PayrollEntry[]) => {
    console.log("📤 Enviando payroll:", data);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Employee Payroll</h1>
      {employees.length === 0 ? (
        <p className="text-red-500">⚠ No hay empleados disponibles.</p>
      ) : (
        <PayrollFormEmployee employees={employees} onSave={handleSave} onSubmit={handleSubmit} />
      )}
    </div>
  );
}