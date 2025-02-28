import { supabase } from "./supabaseClient";

// 🔍 Obtener empleados según el rol del supervisor
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

// 🔍 Obtener Payroll de empleados (Solo para Admin)
export const getEmployeePayroll = async () => {
  console.log("🔍 Obteniendo datos de Payroll de empleados...");

  const { data, error } = await supabase
    .from("payroll")
    .select("id, employee_id, supervisor_id, date, hours_worked, services_completed, status, created_at")
    .eq("status", "pending");

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

// ✏ **Actualizar un Payroll específico**
export const updateEmployeePayroll = async (payrollId: string, updates: any) => {
  console.log("✏ Actualizando Payroll con ID:", payrollId, "Datos:", updates);

  const { error } = await supabase
    .from("payroll")
    .update(updates)
    .eq("id", payrollId);

  if (error) {
    console.error("❌ Error actualizando Payroll:", error.message);
    return false;
  }

  console.log("✅ Payroll actualizado correctamente.");
  return true;
};