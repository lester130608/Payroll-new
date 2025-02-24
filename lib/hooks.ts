import { useState } from "react";

export const usePayrollForm = (employees: { id: string; name: string }[]) => {
  const [payrollData, setPayrollData] = useState(
    employees.map((emp) => ({
      employee_id: emp.id,
      name: emp.name,
      hours: "",
      services_completed: "",
      date: "",
    }))
  );

  const handleChange = (index: number, field: string, value: string) => {
    const updatedData = [...payrollData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setPayrollData(updatedData);
  };

  return { payrollData, setPayrollData, handleChange };
};