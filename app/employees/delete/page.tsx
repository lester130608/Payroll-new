"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DeleteEmployeePage() {
  const params = useParams(); // ✅ Ahora `params` se obtiene correctamente
  const router = useRouter();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!params.id) return;
      
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.error("Error fetching employee:", error.message);
      } else {
        setEmployee(data);
      }
    };

    fetchEmployee();
  }, [params]); // ✅ `params` ya no es un Promise, sino un objeto listo para usar

  const handleDelete = async () => {
    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting employee:", error.message);
    } else {
      router.push("/employees"); // Redirige a la lista después de eliminar
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Delete Employee</h1>
      <p className="text-lg">Are you sure you want to delete {employee.name}?</p>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Confirm Delete
      </button>
    </div>
  );
}