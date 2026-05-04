import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    // 1. Obtener la contraseña desde el header de Authorization
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    const adminPassword = process.env.ADMIN_PASSWORD;

    // 2. Verificar contraseña
    if (!adminPassword || token !== adminPassword) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // 3. Inicializar Supabase con SERVICE_ROLE para saltar el RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseServiceRole) {
      return NextResponse.json({ error: 'Configuración de servidor incompleta' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

    // 4. Traer todos los registros
    const { data, error } = await supabaseAdmin
      .from('registros_hackaton')
      .select('*')
      .order('fecha_registro', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error('Error al exportar:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
