import { supabase } from "./supabaseClient";

// ✅ Obtener la lista de empleados para configuración
export const getAllEmployees = async () => {
    console.log("🔍 Obteniendo todos los empleados...");
    
    const { data, error } = await supabase
        .from("employees")
        .select("id, name, email, phone, employee_type, supervisor_id, status, rate, employment_type");

    if (error) {
        console.error("❌ Error obteniendo empleados:", error.message);
        return [];
    }

    console.log("✅ Empleados obtenidos:", data);
    return data || [];
};

// ✅ Obtener detalles de un empleado específico por ID
export const getEmployeeById = async (employeeId: string) => {
    console.log("🔍 Obteniendo datos del empleado:", employeeId);

    const { data, error } = await supabase
        .from("employees")
        .select("id, name, email, phone, employee_type, supervisor_id, status, rate, employment_type")
        .eq("id", employeeId)
        .single();

    if (error) {
        console.error("❌ Error obteniendo empleado:", error.message);
        return null;
    }

    console.log("✅ Datos del empleado obtenidos:", data);
    return data;
};

// ✅ Actualizar los datos de un empleado
export const updateEmployee = async (employeeId: string, updatedData: Partial<{ 
    name: string, 
    email: string, 
    phone: string, 
    employee_type: string, 
    status: string, 
    rate: number,
    employment_type: string
}>) => {
    console.log("🛠️ Actualizando empleado:", employeeId, "con datos:", updatedData);

    const { error } = await supabase
        .from("employees")
        .update(updatedData)
        .eq("id", employeeId);

    if (error) {
        console.error("❌ Error actualizando empleado:", error.message);
        return { success: false, message: error.message };
    }

    console.log("✅ Empleado actualizado correctamente.");
    return { success: true, message: "Empleado actualizado exitosamente." };
};

// ✅ Eliminar un empleado por ID
export const deleteEmployee = async (employeeId: string) => {
    console.log("🗑️ Eliminando empleado:", employeeId);

    const { error } = await supabase
        .from("employees")
        .delete()
        .eq("id", employeeId);

    if (error) {
        console.error("❌ Error eliminando empleado:", error.message);
        return { success: false, message: error.message };
    }

    console.log("✅ Empleado eliminado correctamente.");
    return { success: true, message: "Empleado eliminado exitosamente." };
};