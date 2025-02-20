"use client";

import { useEffect, useState } from "react";

// Simulación de datos por ahora
const rolesSimulados = ["TCM", "Clinicians", "RBT", "BCaBA", "BCBA", "Employee"];
const serviciosSimulados = [
  "Individual Therapy",
  "Family Therapy",
  "Group Therapy",
  "Intake",
  "In-depth Bio",
  "In-depth Intake",
  "TP Review",
  "Assessment",
  "Reassessment",
];

export default function AsignarServiciosPage() {
  const [roles, setRoles] = useState<string[]>([]);
  const [servicios, setServicios] = useState<string[]>([]);
  const [asignaciones, setAsignaciones] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setRoles(rolesSimulados);
    setServicios(serviciosSimulados);

    // Inicializamos las asignaciones vacías para cada rol
    const inicialAsignaciones: Record<string, string[]> = {};
    rolesSimulados.forEach((rol) => {
      inicialAsignaciones[rol] = [];
    });
    setAsignaciones(inicialAsignaciones);
  }, []);

  const toggleServicio = (rol: string, servicio: string) => {
    setAsignaciones((prev) => {
      const serviciosAsignados = prev[rol] || [];
      if (serviciosAsignados.includes(servicio)) {
        return {
          ...prev,
          [rol]: serviciosAsignados.filter((s) => s !== servicio),
        };
      } else {
        return {
          ...prev,
          [rol]: [...serviciosAsignados, servicio],
        };
      }
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Assign Services to Roles</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {roles.map((rol) => (
          <div key={rol} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{rol}</h2>
            <div className="flex flex-wrap gap-4">
              {servicios.map((servicio) => (
                <label key={servicio} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={asignaciones[rol]?.includes(servicio) || false}
                    onChange={() => toggleServicio(rol, servicio)}
                  />
                  {servicio}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
