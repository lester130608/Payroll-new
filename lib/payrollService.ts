import { supabase } from "./supabaseClient";

// 🔍 Obtener empleados según el rol del usuario
export const getEmployeesForSupervisor = async (supervisorId: string, role: string) => {
  console.log("🔍 Buscando empleados para supervisor:", supervisorId, "Rol:", role);

  const roleMapping: { [key: string]: string[] } = {
    "supervisor_ba": ["rbt", "bcba", "bcaba"],
    "supervisor_tcm": ["tcm"],
    "supervisor_clinician": ["clinicians"],
    "admin": ["employee"]  // ✅ Admin solo ve empleados administrativos
  };

  const employeeTypes = roleMapping[role];

  if (!employeeTypes) {
    console.error("❌ Rol no reconocido:", role);
    return [];
  }

  let query = supabase
    .from("employees")
    .select("id, name, employee_type, supervisor_id, status")
    .eq("status", "active")
    .in("employee_type", employeeTypes);

  if (role !== "admin") {
    query = query.eq("supervisor_id", supervisorId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ Error obteniendo empleados:", error.message);
    return [];
  }

  console.log("✅ Empleados encontrados:", data);
  return data;
};

// 🔍 Obtener Payroll General (Solo los pendientes)
export const getTotalPayroll = async () => {
  console.log("🔍 Obteniendo datos de Payroll General...");

  const { data, error } = await supabase
    .from("payroll")
    .select("id, employee_id, supervisor_id, date, hours_worked, services_completed, status, created_at")
    .eq("status", "pending");

  if (error) {
    console.error("❌ Error obteniendo Payroll General:", error.message);
    return [];
  }

  console.log("✅ Payroll General obtenido:", data);
  return data;
};

// 🔍 Obtener Payroll de empleados administrativos (Solo para Admin)
export const getEmployeePayroll = async () => {
  console.log("🔍 Obteniendo datos de Payroll de empleados...");

  const { data, error } = await supabase
    .from("payroll")
    .select("id, employee_id, supervisor_id, date, hours_worked, services_completed, status, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error obteniendo Payroll de empleados:", error.message);
    return [];
  }

  console.log("✅ Payroll de empleados obtenido:", data);
  return data;
};

// ❌ Rechazar un Payroll y devolverlo al Supervisor
export const rejectPayrollEntry = async (payrollId: string, reason: string) => {
  console.log("❌ Rechazando Payroll con ID:", payrollId, "Razón:", reason);

  const { error } = await supabase
    .from("payroll")
    .update({ status: "rejected", rejection_reason: reason })
    .eq("id", payrollId);

  if (error) {
    console.error("❌ Error rechazando Payroll:", error.message);
    return false;
  }

  console.log("✅ Payroll rechazado correctamente.");
  return true;
};

// ✅ Aprobar todos los Payroll pendientes
export const approveAllPayroll = async () => {
  console.log("✅ Aprobando todos los Payroll pendientes...");

  const { error } = await supabase
    .from("payroll")
    .update({ status: "approved" })
    .eq("status", "pending");

  if (error) {
    console.error("❌ Error aprobando Payroll:", error.message);
    return false;
  }

  console.log("✅ Todos los Payroll han sido aprobados.");
  return true;
};