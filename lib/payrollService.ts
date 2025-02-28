import { supabase } from "./supabaseClient";

// Obtener empleados para el supervisor
export const getEmployeesForSupervisor = async (supervisorId: string, role: string) => {
  console.log("🔍 Buscando empleados para supervisor:", supervisorId, "Rol:", role);

  const roleMapping: { [key: string]: string[] } = {
    "supervisor_ba": ["rbt", "bcba", "bcaba"],
    "supervisor_tcm": ["tcm"],
    "supervisor_clinician": ["clinicians"],
    "admin": ["employee"]
  };

  const employeeTypes = roleMapping[role];

  if (!employeeTypes) {
    console.error("❌ Rol no reconocido:", role);
    return [];
  }

  const { data, error } = await supabase
    .from("employees")
    .select("id, name, employee_type, supervisor_id, status")
    .eq("status", "active")
    .in("employee_type", employeeTypes)
    .eq("supervisor_id", supervisorId);

  if (error) {
    console.error("❌ Error obteniendo empleados:", error.message);
    return [];
  }

  console.log("✅ Empleados encontrados:", data);
  return data;
};