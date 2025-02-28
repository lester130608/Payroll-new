"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormBA from "@/components/PayrollFormBA";

interface Employee {
  id: string;
  name: string;
  employee_type: string;
}

export default function CreateBAPayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (session?.user) {
      const { id, role } = session.user;
      getEmployeesForSupervisor(id, role)
        .then((data: Employee[]) => setEmployees(data))
        .catch((error) => console.error("Error fetching employees:", error));
    }
  }, [session?.user?.id, session?.user?.role]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create BA Payroll</h1>
      <PayrollFormBA employees={employees} />
    </div>
  );
}