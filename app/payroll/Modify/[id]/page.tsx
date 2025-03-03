"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEmployeePayrollNew as getEmployeePayroll, updateEmployeePayrollNew as updateEmployeePayroll, Payroll } from "@/lib/payrollServiceNew";

export default function ModifyPayrollPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id; // ✅ Asegurar que `id` sea un string

  const [employee, setEmployee] = useState<{ name: string; total_pay: string }>({
    name: "",
    total_pay: "",
  });

  useEffect(() => {
    if (!id) return; // ✅ Evitamos llamadas innecesarias si `id` es undefined

    getEmployeePayroll(id).then((data: Payroll[]) => {
      if (data.length > 0) {
        const payroll = data[0]; // 🔹 Tomamos el primer elemento del array
        setEmployee({
          name: payroll.employee_id, // 🔹 Ajusta esto si tienes el nombre en otro campo
          total_pay: payroll.hours_worked.toString(), // 🔹 Convierte `number` a `string`
        });
      } else {
        console.error(`❌ No se encontró payroll para el ID: ${id}`);
      }
    });
  }, [id]);

  const handleSave = async () => {
    if (!id) {
      alert("❌ Error: No se puede actualizar porque el ID es inválido.");
      return;
    }

    await updateEmployeePayroll(id, {
      hours_worked: parseFloat(employee.total_pay), // 🔹 Convertimos `total_pay` a número antes de enviarlo
    });

    alert("✅ Payroll updated successfully!");
    router.push("/payroll/total");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Modify Payroll</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block text-gray-700">Employee ID</label>
        <input
          type="text"
          value={employee.name}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          readOnly
        />

        <label className="block text-gray-700 mt-4">Total Pay</label>
        <input
          type="number"
          value={employee.total_pay}
          onChange={(e) => setEmployee({ ...employee, total_pay: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}