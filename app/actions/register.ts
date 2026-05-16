'use server'

import { getSupabaseAdmin } from '@/utils/supabase/server';

export async function registerTeam(formData: any) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    
    const { error } = await supabaseAdmin
      .from('registros_hackaton')
      .insert([formData]);

    if (error) {
      console.error("Error de Supabase controlado:", error);
      
      // 23505 es el código de error de duplicados en Postgres
      if (error.code === '23505') {
        const detail = (error.details || error.message || "").toLowerCase();
        
        if (detail.includes('nombre_equipo')) {
          return { success: false, error: "¡Ese nombre de equipo ya existe! Pónganse más creativos." };
        }
        if (detail.includes('telefono')) {
          return { success: false, error: "¡Pilas! Uno de los números de teléfono ya está registrado en otro equipo." };
        }
        return { success: false, error: "Este equipo o alguno de sus integrantes ya están registrados." };
      }

      return { success: false, error: error.message || "Error al guardar en la base de datos." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error crítico en Server Action:", err);
    // IMPORTANTE: Retornamos un objeto plano, nunca lanzamos error (throw) 
    // para evitar que Next.js muestre la pantalla de error de producción.
    return { success: false, error: "Error interno del servidor. Por favor, reintenta." };
  }
}

export async function checkTeamExists(name: string) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data } = await supabaseAdmin
      .from('registros_hackaton')
      .select('nombre_equipo')
      .ilike('nombre_equipo', name.trim())
      .maybeSingle();

    return !!data;
  } catch (err) {
    console.error("Error al validar equipo:", err);
    return false;
  }
}

export async function deleteTeam(id: any, nombreEquipo: string) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    let query = supabaseAdmin.from('registros_hackaton').delete();
    
    if (id !== undefined && id !== null) {
      query = query.eq('id', id);
    } else {
      query = query.eq('nombre_equipo', nombreEquipo);
    }

    const { error } = await query;

    if (error) {
      console.error("Error al borrar equipo:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error("Error crítico al borrar:", err);
    return { success: false, error: "Error interno del servidor." };
  }
}
