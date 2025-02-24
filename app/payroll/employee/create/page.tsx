"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getEmployeesForSupervisor } from "@/lib/payrollService";
import PayrollForm from "@/components/PayrollForm";

export default function CreateEmployeePayrollPage() {
  const { data: session } = useSession();
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (session?.user) {
      getEmployeesForSupervisor(session.user.id, "employee").then(setEmployees);
    }
  }, [session]);

  const handleSave = (data: any) => {
    console.log("Employee Payroll saved as Draft:", data);
    alert("Payroll saved successfully!");
  };

  const handleSubmit = (data: any) => {
    console.log("Employee Payroll submitted as Final:", data);
    alert("Payroll submitted successfully!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create Employee Payroll</h1>
      <PayrollForm employees={employees} employeeType="employee" onSave={handleSave} onSubmit={handleSubmit} />
    </div>
  );
}