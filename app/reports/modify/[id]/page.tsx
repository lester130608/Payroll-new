"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ModifyReportPage() {
  const params = useParams() ?? {}; // ✅ Asegura que `params` no sea `null`
  const reportId = params.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null; // ✅ Verifica que `id` esté definido

  const [reportData] = useState({ name: "" });

  useEffect(() => {
    if (!reportId) {
      console.error("❌ Report ID no encontrado.");
      return;
    }

    console.log("🔍 Obteniendo datos del reporte con ID:", reportId);

    // Aquí iría la lógica para obtener los datos del reporte con `reportId`
  }, [reportId]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Modify Report</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label className="block text-gray-700">Report Name</label>
        <input
          type="text"
          value={reportData.name}
          className="w-full px-4 py-2 border rounded-lg bg-gray-200"
          readOnly
        />
      </div>
    </div>
  );
}