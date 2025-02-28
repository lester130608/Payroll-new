import { supabase } from "./supabaseClient";

// 🔹 Definir interfaz para empleados
export interface Employee {
  id: string;
  name: string;
  employee_type: string;
  employment_type: string;
  supervisor_id: string;
  status: string;
  rate: number;
}

// 🔹 Definir interfaz para Payroll
export interface Payroll {
  id: string;
  employee_id: string;
  supervisor_id: string;
  date: string;
  hours_worked: number;
  services_completed: number;
  status: string;
  created_at: string;
  rejection_reason?: string;
  total_pay: number;
  employee_name: string;
  employee_type: string;
  employment_type: string;
}

// 🔍 Obtener empleados según el rol del supervisor
export const getEmployeesForSupervisor = async (
  supervisorId: string,
  role: string
): Promise<Employee[]> => {
  if (!supervisorId || !role) {
    console.error("❌ Error: supervisorId o role no válidos.");
    return [];
  }

  console.log("🔍 Buscando empleados para supervisor:", supervisorId, "Rol:", role);

  const roleMapping: Record<string, string[]> = {
    supervisor_ba: ["rbt", "bcba", "bcaba"],
    supervisor_tcm: ["tcm"],
    supervisor_clinician: ["clinicians"],
    admin: ["employee"],
  };

  const employeeTypes = roleMapping[role];

  if (!employeeTypes) {
    console.error("❌ Error: Rol no reconocido:", role);
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("employees")
      .select("id, name, employee_type, employment_type, supervisor_id, status, rate")
      .eq("status", "active")
      .in("employee_type", employeeTypes)
      .eq("supervisor_id", supervisorId);

    if (error) throw new Error(error.message);

    return (data || []).map((emp) => ({
      ...emp,
      rate: emp.rate ?? 0,
    }));
  } catch (error) {
    console.error("❌ Error obteniendo empleados:", error);
    return [];
  }
};

// 🔍 Obtener Payroll de un empleado
export const getEmployeePayroll = async (employeeId: string): Promise<Payroll[]> => {
  if (!employeeId) {
    console.error("❌ Error: employeeId no válido.");
    return [];
  }

  console.log("🔍 Obteniendo Payroll para empleado:", employeeId);

  try {
    const { data, error } = await supabase
      .from("payroll")
      .select("*")
      .eq("employee_id", employeeId);

    if (error) throw new Error(error.message);

    return data || [];
  } catch (error) {
    console.error("❌ Error obteniendo Payroll del empleado:", error);
    return [];
  }
};

// ✅ Actualizar datos de Payroll de un empleado
export const updateEmployeePayroll = async (
  payrollId: string,
  updates: Partial<Payroll>
): Promise<boolean> => {
  if (!payrollId || !updates) {
    console.error("❌ Error: payrollId o updates no válidos.");
    return false;
  }

  console.log("📝 Actualizando Payroll con ID:", payrollId);

  try {
    const { error } = await supabase
      .from("payroll")
      .update(updates)
      .eq("id", payrollId);

    if (error) throw new Error(error.message);

    console.log("✅ Payroll actualizado correctamente.");
    return true;
  } catch (error) {
    console.error("❌ Error actualizando Payroll:", error);
    return false;
  }
};

// ❌ Rechazar un Payroll con motivo
export const rejectPayrollEntry = async (payrollId: string, reason: string): Promise<boolean> => {
  if (!payrollId || !reason) {
    console.error("❌ Error: payrollId o reason no válidos.");
    return false;
  }

  console.log("❌ Rechazando Payroll con ID:", payrollId, "Razón:", reason);

  try {
    const { error } = await supabase
      .from("payroll")
      .update({ status: "rejected", rejection_reason: reason })
      .eq("id", payrollId);

    if (error) throw new Error(error.message);

    console.log("✅ Payroll rechazado correctamente.");
    return true;
  } catch (error) {
    console.error("❌ Error rechazando Payroll:", error);
    return false;
  }
};

// 🔍 Obtener Payroll General con detalles de empleados y total_pay
export const getTotalPayroll = async (): Promise<Payroll[]> => {
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

// ✅ Aprobar todos los Payroll pendientes
export const approveAllPayroll = async (): Promise<boolean> => {
  console.log("✅ Aprobando todos los Payroll pendientes...");

  try {
    const { data, error } = await supabase
      .from("payroll")
      .update({ status: "approved" })
      .eq("status", "pending")
      .select();

    if (error) throw new Error(error.message);

    if (!data || data.length === 0) {
      console.warn("⚠️ No hay payrolls pendientes por aprobar.");
      return false;
    }

    console.log(`✅ ${data.length} Payrolls han sido aprobados.`);
    return true;
  } catch (error) {
    console.error("❌ Error aprobando Payroll:", error);
    return false;
  }
};
