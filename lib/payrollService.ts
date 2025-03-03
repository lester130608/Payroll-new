import { supabase } from "./supabaseClient"; // ✅ Asegurar que esta línea esté al inicio del archivo

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

// ✅ Exportamos todas las funciones correctamente
export {
  getEmployeesForSupervisor,
  getTotalPayroll, // ✅ Asegura que `getTotalPayroll` está exportado correctamente
};