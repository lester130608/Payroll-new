"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Tarifa {
  servicio: string;
  tarifa: number;
}

export default function PayrollTotalPage() {
  const [tarifas, setTarifas] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const [tcmData, setTcmData] = useState([{ name: "Employee 1", hours: "", total: 0 }]);
  const [cliniciansData, setCliniciansData] = useState([{ name: "Employee 2", services: "", total: 0 }]);
  const [baData, setBaData] = useState([{ name: "Employee 3", hours: "", assessment: "", reassessment: "", total: 0 }]);
  const [employeeData, setEmployeeData] = useState([{ name: "Employee 4", hours: "", rate: "", total: 0 }]);

  useEffect(() => {
    async function fetchTarifas() {
      const { data, error } = await supabase.from("tarifas").select("*");
      if (error) console.error(error);
      else {
        const tarifasMap: Record<string, number> = {};
        data.forEach((t: Tarifa) => {
          tarifasMap[t.servicio] = t.tarifa;
        });
        setTarifas(tarifasMap);
      }
      setLoading(false);
    }

    fetchTarifas();
  }, []);

  const handleChange = (setData: any, index: number, field: string, value: string) => {
    setData((prev: any) => {
      const updated = [...prev];
      updated[index][field] = value;

      // Recalcular el total en función del campo que cambió
      if (field === "hours" || field === "rate" || field === "services" || field === "assessment" || field === "reassessment") {
        const rate =
          field === "rate"
            ? parseFloat(value)
            : tarifas[updated[index].services] || tarifas[updated[index].type] || 0;

        let total = 0;
        if (field === "hours" || field === "rate") {
          total = parseFloat(updated[index].hours || "0") * rate;
        } else if (field === "services") {
          total = rate;
        } else if (field === "assessment" || field === "reassessment") {
          const hours = parseFloat(updated[index].hours || "0");
          const assessment = parseFloat(updated[index].assessment || "0");
          const reassessment = parseFloat(updated[index].reassessment || "0");

          total = hours * rate + assessment * tarifas["Assessment"] + reassessment * tarifas["Reassessment"];
        }

        updated[index].total = isNaN(total) ? 0 : total;
      }

      return updated;
    });
  };

  if (loading) {
    return <div className="p-8">Cargando tarifas...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payroll Total</h1>

      {/* TCM Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">TCM</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th>Employee Name</th>
              <th>Hours</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {tcmData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>
                  <input
                    type="number"
                    value={row.hours}
                    onChange={(e) => handleChange(setTcmData, index, "hours", e.target.value)}
                  />
                </td>
                <td>${row.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Repite esto para Clinicians, BA y Employee usando la misma lógica */}
      {/* ... */}
    </div>
  );
}
