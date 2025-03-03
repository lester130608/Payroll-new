"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "../../../../lib/payrollService";
import PayrollFormClinicians, { PayrollEntry } from "@/components/PayrollFormClinicians"; 

interface Employee {
  id: string;
  name: string;
  employee_type: string;
}

export default function CreateCliniciansPayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const userId = session?.user?.id;
    const userRole = session?.user?.role;

    if (userId && userRole) {
      getEmployeesForSupervisor(userId, userRole)
        .then((data: Employee[]) => setEmployees(data))
        .catch((error) => console.error("Error al obtener empleados:", error));
    }
  }, [session?.user?.id, session?.user?.role]);

  const handleSave = (data: PayrollEntry[]) => {
    console.log("Saving payroll data:", data);
    // Aquí podrías agregar lógica para guardar en Supabase
  };

  const handleSubmit = (data: PayrollEntry[]) => {
    console.log("Submitting payroll data:", data);
    // Aquí podrías agregar lógica para enviar los datos a una API
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Clinicians Payroll</h1>
      <PayrollFormClinicians 
        employees={employees} 
        onSave={handleSave} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}