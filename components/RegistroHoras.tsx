"use client";

import React, { useState } from "react";
import useRegistroStore from "@/lib/useRegistroStore";

interface Registro {
  empleado: string;
  fecha: string;
  horas: string;
  servicio: string;
}

const RegistroHoras: React.FC = () => {
  const { registros, agregarRegistro, limpiarRegistros } = useRegistroStore();
  const [empleado, setEmpleado] = useState("");
  const [fecha, setFecha] = useState("");
  const [horas, setHoras] = useState("");
  const [servicio, setServicio] = useState("");

  const handleAddRegistro = () => {
    if (!empleado || !fecha || !horas || !servicio) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    agregarRegistro({ empleado, fecha, horas, servicio });
    setEmpleado("");
    setFecha("");
    setHoras("");
    setServicio("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Registro de Horas</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <label className="block text-gray-700">Empleado</label>
        <input
          type="text"
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />

        <label className="block text-gray-700">Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />

        <label className="block text-gray-700">Horas</label>
        <input
          type="number"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />

        <label className="block text-gray-700">Servicio</label>
        <input
          type="text"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />

        <button
          onClick={handleAddRegistro}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Agregar Registro
        </button>

        {registros.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Registros Guardados</h2>
            <ul className="bg-gray-100 p-4 rounded-lg">
              {registros.map((registro: Registro, index: number) => ( // ✅ Tipamos `index` como `number`
                <li key={index} className="border-b last:border-0 py-2">
                  {registro.fecha} - {registro.empleado} - {registro.horas}h - {registro.servicio}
                </li>
              ))}
            </ul>
            <button
              onClick={limpiarRegistros}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-4"
            >
              Limpiar Registros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroHoras;