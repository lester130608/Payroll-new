"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Tarifa {
  id: number;
  servicio: string;
  tarifa: number;
}

export default function TarifasPage() {
  const [tarifas, setTarifas] = useState<Tarifa[]>([]);
  const [newTarifa, setNewTarifa] = useState({
    servicio: "",
    tarifa: "",
  });

  useEffect(() => {
    const fetchTarifas = async () => {
      const { data, error } = await supabase.from("tarifas").select("*");
      if (error) console.error(error);
      else if (data) setTarifas(data);
    };

    fetchTarifas();
  }, []);

  const handleCreateTarifa = async () => {
    const { data, error } = await supabase
      .from("tarifas")
      .insert([
        { servicio: newTarifa.servicio, tarifa: parseFloat(newTarifa.tarifa) },
      ])
      .select(); // 👈 Forzamos a que devuelva los datos insertados

    if (error) {
      console.error(error);
    } else if (data) {
      setTarifas([...tarifas, ...data]);
    }

    setNewTarifa({ servicio: "", tarifa: "" });
  };

  const handleDeleteTarifa = async (id: number) => {
    const { error } = await supabase.from("tarifas").delete().eq("id", id);
    if (error) console.error(error);
    else setTarifas(tarifas.filter((tarifa) => tarifa.id !== id));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestión de Tarifas</h1>

      {/* Formulario para crear */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Añadir Nueva Tarifa</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={newTarifa.servicio}
            onChange={(e) =>
              setNewTarifa({ ...newTarifa, servicio: e.target.value })
            }
            className="border p-2 rounded flex-1"
          >
            <option value="">Selecciona un servicio</option>
            <option value="IT">IT</option>
            <option value="BIO">BIO</option>
            <option value="TP">TP</option>
            <option value="INTAKE">INTAKE</option>
            <option value="IN-DEPTH BIO">IN-DEPTH BIO</option>
            <option value="IN-DEPTH INTAKE">IN-DEPTH INTAKE</option>
            <option value="IN-DEPTH EXISTING">IN-DEPTH EXISTING</option>
            <option value="TP REVIEW">TP REVIEW</option>
          </select>

          <input
            type="number"
            placeholder="Tarifa"
            value={newTarifa.tarifa}
            onChange={(e) =>
              setNewTarifa({ ...newTarifa, tarifa: e.target.value })
            }
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={handleCreateTarifa}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Añadir
          </button>
        </div>
      </div>

      {/* Listado */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Tarifas Actuales</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Servicio</th>
              <th className="border px-4 py-2">Tarifa</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tarifas.map((tarifa) => (
              <tr key={tarifa.id}>
                <td className="border px-4 py-2">{tarifa.servicio}</td>
                <td className="border px-4 py-2">${tarifa.tarifa.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteTarifa(tarifa.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {tarifas.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No hay tarifas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
