'use server'

import { supabaseAdmin } from '@/utils/supabase/server';

export async function registerTeam(formData: any) {
  try {
    const { error } = await supabaseAdmin
      .from('registros_hackaton')
      .insert([formData]);

    if (error) {
      // Si el error es por duplicado (código 23505)
      if (error.code === '23505') {
        const errMsg = error.message || error.details || "";
        if (errMsg.includes('nombre_equipo')) {
          throw new Error("¡Pilas! Ese nombre de equipo ya existe.");
        } else {
          throw new Error("¡Pilas! Un dato (como el teléfono) ya está registrado en otro equipo.");
        }
      }
      throw new Error(error.message);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error en Server Action:", err);
    throw err;
  }
}

export async function checkTeamExists(name: string) {
  try {
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
