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

// Definir interfaz para Payroll
interface Payroll {
  id: string;
  employee_id: string;
  supervisor_id: string;
  date: string;
  hours_worked: number;
  services_completed: number;
  status: string;
  created_at: string;
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

    if (error) {
      console.error("❌ Error obteniendo empleados:", error);
      return [];
    }

    console.log("✅ Empleados encontrados:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error inesperado obteniendo empleados:", error);
    return [];
  }
};

// 🔍 Obtener Payroll de un empleado
export const getEmployeePayroll = async (employeeId: string): Promise<Payroll[]> => {
  console.log("🔍 Obteniendo Payroll para empleado:", employeeId);

  try {
    const { data, error } = await supabase
      .from("payroll")
      .select("*")
      .eq("employee_id", employeeId);

    if (error) {
      console.error("❌ Error obteniendo Payroll del empleado:", error);
      return [];
    }

    console.log("✅ Payroll obtenido:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error inesperado obteniendo Payroll:", error);
    return [];
  }
};

// ✅ Actualizar datos de Payroll de un empleado
export const updateEmployeePayroll = async (payrollId: string, updates: Partial<Payroll>): Promise<boolean> => {
  console.log("📝 Actualizando Payroll con ID:", payrollId);

  try {
    const { error } = await supabase
      .from("payroll")
      .update(updates)
      .eq("id", payrollId);

    if (error) {
      console.error("❌ Error actualizando Payroll:", error);
      return false;
    }

    console.log("✅ Payroll actualizado correctamente.");
    return true;
  } catch (error) {
    console.error("❌ Error inesperado actualizando Payroll:", error);
    return false;
  }
};

// ❌ Rechazar un Payroll
export const rejectPayrollEntry = async (payrollId: string): Promise<boolean> => {
  console.log("❌ Rechazando Payroll con ID:", payrollId);

  try {
    const { error } = await supabase
      .from("payroll")
      .update({ status: "rejected" })
      .eq("id", payrollId);

    if (error) {
      console.error("❌ Error rechazando Payroll:", error);
      return false;
    }

    console.log("✅ Payroll rechazado correctamente.");
    return true;
  } catch (error) {
    console.error("❌ Error inesperado rechazando Payroll:", error);
    return false;
  }
};

// 🔍 Obtener Payroll General
export const getTotalPayroll = async (): Promise<Payroll[]> => {
  console.log("🔍 Obteniendo datos de Payroll General...");

  try {
    const { data, error } = await supabase
      .from("payroll")
      .select("id, employee_id, supervisor_id, date, hours_worked, services_completed, status, created_at")
      .eq("status", "pending");

    if (error) {
      console.error("❌ Error obteniendo Payroll General:", error);
      return [];
    }

    console.log("✅ Payroll General obtenido:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error inesperado obteniendo Payroll General:", error);
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

    if (error) {
      console.error("❌ Error aprobando Payroll:", error);
      return false;
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ No hay payrolls pendientes por aprobar.");
      return false;
    }

    console.log(`✅ ${data.length} Payrolls han sido aprobados.`);
    return true;
  } catch (error) {
    console.error("❌ Error inesperado aprobando Payroll:", error);
    return false;
  }
};