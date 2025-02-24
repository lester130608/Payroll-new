import { supabase } from "./supabaseClient";

export const getEmployeesForSupervisor = async (supervisorId: string, supervisorRole: string) => {
  console.log("🔍 Buscando empleados para supervisor:", supervisorId, "Rol del supervisor:", supervisorRole);

  const roleMapping: { [key: string]: string[] } = {
    "supervisor_ba": ["rbt", "bcba", "bcaba"],
    "supervisor_tcm": ["tcm"],  // ✅ Ahora `tcm` es reconocido correctamente
    "supervisor_clinician": ["clinicians"]
  };

  const employeeTypes = roleMapping[supervisorRole];

  if (!employeeTypes || employeeTypes.length === 0) {
    console.error("❌ Rol del supervisor no reconocido:", supervisorRole);
    return [];
  }

  console.log("✅ Tipos de empleados permitidos:", employeeTypes);

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

  console.log("✅ Empleados encontrados para supervisor:", data);
  return data || [];
};