"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollFormClinicians from "@/components/PayrollFormClinicians";

interface Employee {
  id: string;
  name: string;
}

export default function CreateCliniciansPayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (session?.user) {
      getEmployeesForSupervisor(session.user.id, session.user.role).then((data: Employee[]) => {
        setEmployees(data);
      });
    }
  }, [session]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Clinicians Payroll</h1>
      <PayrollFormClinicians employees={employees} />
    </div>
  );
}