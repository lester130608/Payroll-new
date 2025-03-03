import { supabase } from "./supabaseClient"; // ✅ Asegurar que está bien importado

// 🔹 Obtener empleados según el rol del supervisor
export const getEmployeesForSupervisorNew = async (supervisorId: string, role: string) => {
  if (!supervisorId || !role) {
    console.error("❌ Error: supervisorId o role no válidos.");
    return [];
  }

  console.log("🔍 Buscando empleados para supervisor:", supervisorId, "Rol:", role);

  let query = supabase
    .from("employees")
    .select("id, name, employee_type, employment_type, supervisor_id, status, rate")
    .eq("status", "active");

  if (role === "admin") {
    query = query.eq("employee_type", "employee"); // ✅ Admin solo ve "employee"
  } else {
    const roleMapping: Record<string, string[]> = {
      supervisor_ba: ["rbt", "bcba", "bcaba"],
      supervisor_tcm: ["tcm"],
      supervisor_clinician: ["clinicians"],
    };

    const employeeTypes = roleMapping[role];

    if (!employeeTypes) {
      console.error("❌ Error: Rol no reconocido:", role);
      return [];
    }

    query = query.in("employee_type", employeeTypes).eq("supervisor_id", supervisorId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("❌ Error obteniendo empleados:", error);
    return [];
  }

  console.log("✅ Empleados encontrados:", data);
  return data || [];
};

// 🔹 Obtener Payroll General
export const getTotalPayrollNew = async () => {
  console.log("🔍 Obteniendo datos de Payroll General...");

  try {
    const { data, error } = await supabase
      .from("payroll")
      .select(`
        id,
        employee_id,
        supervisor_id,
        date,
        hours_worked,
        services_completed,
        status,
        created_at,
        rejection_reason,
        total_pay,
        employees!inner(name, employee_type, employment_type)
      `)
      .eq("status", "pending");

    if (error) throw new Error(error.message);

    return (data || []).map((payroll) => {
      const employee = Array.isArray(payroll.employees) ? payroll.employees[0] : payroll.employees;
      return {
        ...payroll,
        total_pay: payroll.total_pay ?? 0,
        employee_name: employee?.name ?? "N/A",
        employee_type: employee?.employee_type ?? "N/A",
        employment_type: employee?.employment_type ?? "N/A",
      };
    });
  } catch (error) {
    console.error("❌ Error obteniendo Payroll General:", error);
    return [];
  }
};

// ✅ Exportamos todas las funciones correctamente
export { getEmployeesForSupervisorNew, getTotalPayrollNew };