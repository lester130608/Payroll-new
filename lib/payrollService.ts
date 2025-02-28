import { supabase } from "./supabaseClient";

// Definir interfaz para empleados
interface Employee {
  id: string;
  name: string;
  employee_type: string;
  employment_type: string;
  supervisor_id: string;
  status: string;
}

// 🔍 Obtener empleados según el rol del supervisor
export const getEmployeesForSupervisor = async (
  supervisorId: string,
  role: string
): Promise<Employee[]> => {
  console.log("🔍 Buscando empleados para supervisor:", supervisorId, "Rol:", role);

  const roleMapping: Record<string, string[]> = {
    supervisor_ba: ["rbt", "bcba", "bcaba"],
    supervisor_tcm: ["tcm"],
    supervisor_clinician: ["clinicians"],
    admin: ["employee"],
  };

  const employeeTypes = roleMapping[role];

  if (!employeeTypes) {
    console.error("❌ Rol no reconocido:", role);
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("employees")
      .select("id, name, employee_type, employment_type, supervisor_id, status")
      .eq("status", "active")
      .in("employee_type", employeeTypes)
      .eq("supervisor_id", supervisorId);

    if (error) throw error;

    console.log("✅ Empleados encontrados:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error obteniendo empleados:", error);
    return [];
  }
};

// 🔍 Obtener Payroll General
export const getTotalPayroll = async (): Promise<Employee[]> => {
  console.log("🔍 Obteniendo datos de Payroll General...");

  try {
    const { data, error } = await supabase
      .from("payroll")
      .select("id, employee_id, supervisor_id, date, hours_worked, services_completed, status, created_at")
      .eq("status", "pending");

    if (error) throw error;

    console.log("✅ Payroll General obtenido:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error obteniendo Payroll General:", error);
    return [];
  }
};

// ✅ Aprobar todos los Payroll pendientes
export const approveAllPayroll = async (): Promise<boolean> => {
  console.log("✅ Aprobando todos los Payroll pendientes...");

  try {
    const { error } = await supabase
      .from("payroll")
      .update({ status: "approved" })
      .eq("status", "pending");

    if (error) throw error;

    console.log("✅ Todos los Payroll han sido aprobados.");
    return true;
  } catch (error) {
    console.error("❌ Error aprobando Payroll:", error);
    return false;
  }
};