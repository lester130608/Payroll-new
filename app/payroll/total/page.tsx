"use client";

import { useEffect, useState } from "react";
import { 
  getTotalPayrollNew as getTotalPayroll, 
  rejectPayrollEntryNew as rejectPayrollEntry, 
  approveAllPayrollNew as approveAllPayroll, 
  Payroll 
} from "@/lib/payrollServiceNew";

export default function PayrollTotalPage() {
  const [payrollData, setPayrollData] = useState<Payroll[]>([]);

  // ✅ Definir `fetchPayroll`
  const fetchPayroll = async () => {
    try {
      const data = await getTotalPayroll();
      setPayrollData(data);
    } catch (error) {
      console.error("❌ Error al obtener el payroll:", error);
    }
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  const handleReject = async (payrollId: string) => {
    const reason = prompt("Ingrese la razón del rechazo:");
    if (reason) {
      const success = await rejectPayrollEntry(payrollId, reason);
      if (success) {
        fetchPayroll(); // ✅ Ahora `fetchPayroll` está definido
      }
    }
  };

  const handleApproveAll = async () => {
    const confirmed = confirm("¿Está seguro de aprobar todos los payrolls?");
    if (confirmed) {
      const success = await approveAllPayroll();
      if (success) {
        fetchPayroll();
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payroll General</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Tipo de Empleo</th>
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Pago Total</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.length > 0 ? (
            payrollData.map((payroll) => (
              <tr key={payroll.id}>
                <td className="border px-4 py-2">{payroll.employee_name}</td>
                <td className="border px-4 py-2">{payroll.employee_type}</td>
                <td className="border px-4 py-2">{payroll.employment_type}</td>
                <td className="border px-4 py-2">{payroll.status}</td>
                <td className="border px-4 py-2">
                  ${payroll.total_pay ? payroll.total_pay.toFixed(2) : "0.00"}
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleReject(payroll.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    ❌ Rechazar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="border px-4 py-2 text-center text-gray-500">
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={handleApproveAll}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          ✅ Aprobar Todo
        </button>
      </div>
    </div>
  );
}