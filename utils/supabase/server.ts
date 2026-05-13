import { createClient } from '@supabase/supabase-js';

export const getSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // No lanzamos error aquí para evitar que rompa el build si no están las variables,
    // pero retornamos un cliente que fallará solo al usarse si es necesario.
    return createClient(
      url || 'https://placeholder.supabase.co',
      key || 'placeholder'
    );
  }

  return createClient(url, key);
};
