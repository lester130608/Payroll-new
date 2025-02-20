"use client";

import { useEffect, useState } from "react";

export default function ServiciosPage() {
  const [servicios, setServicios] = useState<string[]>([]);
  const [nuevoServicio, setNuevoServicio] = useState("");

  useEffect(() => {
    setServicios([
      "Individual Therapy",
      "Family Therapy",
      "Group Therapy",
      "Intake",
      "In-depth Bio",
      "In-depth Intake",
      "TP Review",
      "Assessment",
      "Reassessment",
    ]);
  }, []);

  const agregarServicio = () => {
    if (nuevoServicio.trim() === "") return;
    setServicios([...servicios, nuevoServicio.trim()]);
    setNuevoServicio("");
  };

  const eliminarServicio = (index: number) => {
    const serviciosActualizados = servicios.filter((_, i) => i !== index);
    setServicios(serviciosActualizados);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={nuevoServicio}
            onChange={(e) => setNuevoServicio(e.target.value)}
            placeholder="New Service Name"
            className="border p-2 flex-grow rounded"
          />
          <button
            onClick={agregarServicio}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Service
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Service Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((servicio, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{servicio}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => eliminarServicio(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {servicios.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No services added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
