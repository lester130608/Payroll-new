"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function DeleteEmployeePage() {
  const router = useRouter();
  const params = useParams(); // Obtiene los parámetros de la URL
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params || typeof params.id !== "string") return; // ✅ Validación corregida

    const fetchEmployee = async () => {
      try {
        const { data, error } = await supabase
          .from("employees")
          .select("id, name, email, phone, role")
          .eq("id", params.id)
          .single();

        if (error) {
          console.error("❌ Error fetching employee:", error.message);
          setLoading(false);
        } else {
          setEmployee(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Unexpected error fetching employee:", error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [params]);

  const handleDelete = async () => {
    if (!params || typeof params.id !== "string") return;

    try {
      const { error } = await supabase
        .from("employees")
        .update({ status: "inactive" })
        .eq("id", params.id);

      if (error) {
        console.error("❌ Error deleting employee:", error.message);
      } else {
        router.push("/employees");
      }
    } catch (error) {
      console.error("❌ Unexpected error deleting employee:", error);
    }
  };

  if (loading) {
    return <p>Loading employee data...</p>;
  }

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Delete Employee</h1>
      <p className="mb-4">Are you sure you want to set this employee as <strong>Inactive</strong>?</p>
      <p className="mb-2"><strong>Name:</strong> {employee.name}</p>
      <p className="mb-2"><strong>Email:</strong> {employee.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {employee.phone}</p>
      <p className="mb-4"><strong>Role:</strong> {employee.role}</p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Set as Inactive
        </button>
        <button
          onClick={() => router.push("/employees")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}