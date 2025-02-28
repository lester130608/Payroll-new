"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormEmployee from "@/components/PayrollFormEmployee";

interface Employee {
  id: string;
  name: string;
  employee_type: string;
}

export default function CreateEmployeePayrollPage() {
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

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Employee Payroll</h1>
      <PayrollFormEmployee employees={employees} />
    </div>
  );
}