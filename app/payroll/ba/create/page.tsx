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
      getEmployeesForSupervisor(session.user.id, session.user.role).then((employees) => {
        setEmployees(employees);
      });
    }
  }, [session]);

  const handleSave = (data: Employee[]) => {
    console.log("BA Payroll saved:", data);
  };

  const handleSubmit = (data: Employee[]) => {
    console.log("BA Payroll submitted:", data);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create BA Payroll</h1>
      <PayrollFormBA employees={employees} onSave={handleSave} onSubmit={handleSubmit} />
    </div>
  );
}