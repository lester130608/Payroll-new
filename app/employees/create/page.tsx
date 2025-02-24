"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateEmployeePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [allowedTypes, setAllowedTypes] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!session?.user) return;

    // Definir qué tipos de empleados puede crear cada supervisor
    let allowed: string[] = [];

    if (session.user.role === "admin") {
      allowed = ["employee", "rbt", "bcba", "bcaba", "clinicians", "tcm"];
    } else if (session.user.role === "supervisor_tcm") {
      allowed = ["tcm"];
    } else if (session.user.role === "supervisor_ba") {
      allowed = ["rbt", "bcba", "bcaba"];
    } else if (session.user.role === "supervisor_clinician") {
      allowed = ["clinicians"];
    }

    setAllowedTypes(allowed);
    setEmployeeType(allowed.length > 0 ? allowed[0] : ""); // Seleccionar automáticamente el primer valor válido
  }, [session]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!session?.user) {
      console.error("No user session found!");
      return;
    }
  
    console.log("User Session Data:", session.user); // 🔍 Ver qué datos tiene `session.user`
  
    let supervisorId = null;
  
    if (session.user.role.includes("supervisor")) {
      supervisorId = session.user.id; // ✅ Tomamos directamente el `id` del usuario autenticado
    }
  
    console.log("Supervisor ID Assigned:", supervisorId); // 🔍 Confirmar el `supervisor_id` antes de insertarlo
  
    // Insertar el nuevo empleado con `supervisor_id`
    const { error } = await supabase.from("employees").insert([
      {
        name,
        email,
        phone,
        status: "active",
        employee_type: employeeType,
        supervisor_id: supervisorId, // ✅ Se asigna correctamente
      },
    ]);
  
    if (error) {
      console.error("Error creating employee:", error.message);
      setErrorMessage("Failed to create employee.");
    } else {
      router.push("/employees");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Create Employee</h1>

      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Employee Type</label>
          <select
            value={employeeType}
            onChange={(e) => setEmployeeType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {allowedTypes.map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
}