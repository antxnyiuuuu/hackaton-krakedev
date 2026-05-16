-- ====================================================================
-- SCRIPT PARA HABILITAR COPILOTOS IA EN LA BASE DE DATOS (SUPABASE)
-- ====================================================================
--
-- INSTRUCCIONES:
-- 1. Ve a tu panel de Supabase (https://supabase.com).
-- 2. Entra en tu proyecto y navega a "SQL Editor" en el menú izquierdo.
-- 3. Crea una nueva consulta ("New Query").
-- 4. Pega este código y presiona el botón "Run".
--

ALTER TABLE registros_hackaton 
ALTER COLUMN telefono_p3 DROP NOT NULL;
