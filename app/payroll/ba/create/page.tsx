"use client";

import { useEffect } from "react"; // ✅ Eliminamos `useState` porque no se usa
import { useSession } from "next-auth/react";

export default function CreatePayrollBA() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    console.log("Usuario en sesión:", session.user);
  }, [session?.user]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create BA Payroll</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600">Formulario para crear payroll de BA</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Guardar
        </button>
      </div>
    </div>
  );
}