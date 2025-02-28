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
    if (!session?.user?.role) return;

    let allowed: string[] = [];

    switch (session.user.role) {
      case "admin":
        allowed = ["employee", "rbt", "bcba", "bcaba", "clinicians", "tcm"];
        break;
      case "supervisor_tcm":
        allowed = ["tcm"];
        break;
      case "supervisor_ba":
        allowed = ["rbt", "bcba", "bcaba"];
        break;
      case "supervisor_clinician":
        allowed = ["clinicians"];
        break;
      default:
        console.warn("❌ Rol desconocido:", session.user.role);
    }

    setAllowedTypes(allowed);
    setEmployeeType(allowed.length > 0 ? allowed[0] : "");
  }, [session?.user?.role]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      console.error("❌ No user session found!");
      return;
    }

    console.log("✅ User Session Data:", session.user);

    const supervisorId =
      session.user.role && session.user.role.includes("supervisor") ? session.user.id : null;

    console.log("✅ Supervisor ID Assigned:", supervisorId);

    const { error } = await supabase.from("employees").insert([
      {
        name,
        email,
        phone,
        status: "active",
        employee_type: employeeType,
        supervisor_id: supervisorId,
      },
    ]);

    if (error) {
      console.error("❌ Error creating employee:", error.message);
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
            {allowedTypes.length > 0 ? (
              allowedTypes.map((type) => (
                <option key={type} value={type}>
                  {type.toUpperCase()}
                </option>
              ))
            ) : (
              <option value="">No available types</option>
            )}
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