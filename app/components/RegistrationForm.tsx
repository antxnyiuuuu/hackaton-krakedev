"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase/client";
import { User, Users, ShieldAlert } from "lucide-react";

interface Props {
  onBack?: () => void;
}

export function RegistrationForm({ onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    nombre_equipo: "",
    nombre_p1: "",
    telefono_p1: "",
    nombre_p2: "",
    telefono_p2: "",
    nombre_p3: "",
    telefono_p3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newError = "";

    if (name.startsWith("telefono") && value.trim() !== "") {
      const phoneRegex = /^09\d{8}$/;
      if (!phoneRegex.test(value)) {
        newError = "Debe tener 10 dígitos, empezar con '09' y sin repetirse ";
      } else {
        const phones = [
          { name: "telefono_p1", val: formData.telefono_p1 },
          { name: "telefono_p2", val: formData.telefono_p2 },
          { name: "telefono_p3", val: formData.telefono_p3 }
        ];
        const duplicates = phones.filter(p => p.val === value && p.name !== name && p.val.trim() !== "");
        if (duplicates.length > 0) {
          newError = "Este teléfono ya está ingresado en el equipo";
        }
      }
    }

    if (name.startsWith("nombre_p") && value.trim() !== "") {
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!nameRegex.test(value)) {
        newError = "Solo se permiten letras y espacios";
      }
    }

    if (name === "nombre_equipo" && value.trim() !== "") {
      try {
        const { data } = await supabase
          .from("registros_hackaton")
          .select("nombre_equipo")
          .ilike("nombre_equipo", value.trim())
          .maybeSingle();

        if (data) {
          newError = "¡Este equipo ya existe!";
        }
      } catch (err) {
        console.error("Error al validar equipo:", err);
      }
    }

    setFieldErrors(prev => ({ ...prev, [name]: newError }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Validar formato de teléfono (empieza con 09 y tiene 10 dígitos)
      const phoneRegex = /^09\d{8}$/;
      const phones = [formData.telefono_p1, formData.telefono_p2, formData.telefono_p3];

      if (!phones.every((p) => phoneRegex.test(p))) {
        setError("Todos los teléfonos deben tener exactamente 10 dígitos y empezar con '09' y sin duplicados.");
        setLoading(false);
        return;
      }

      // 1.5 Validar formato de nombres
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      const names = [formData.nombre_p1, formData.nombre_p2, formData.nombre_p3];
      if (!names.every((n) => nameRegex.test(n))) {
        setError("Los nombres de los participantes solo pueden contener letras y espacios.");
        setLoading(false);
        return;
      }

      // 2. Validar que los teléfonos no se repitan en el mismo equipo
      const uniquePhones = new Set(phones);
      if (uniquePhones.size !== phones.length) {
        setError("Los números de teléfono de los participantes no pueden repetirse.");
        setLoading(false);
        return;
      }

      // 3. Insertar datos en Supabase
      const { error: supabaseError } = await supabase
        .from("registros_hackaton")
        .insert([{
          ...formData,
          nombre_equipo: formData.nombre_equipo.trim()
        }]);

      if (supabaseError) {
        // 23505 es el código de PostgreSQL para "violación de restricción única"
        if (supabaseError.code === '23505') {
          const errMsg = supabaseError.message || supabaseError.details || "";

          if (errMsg.includes('nombre_equipo')) {
            setFieldErrors(prev => ({ ...prev, nombre_equipo: "¡Pilas! Ese nombre de equipo ya existe. Pónganse más creativos." }));
          } else if (errMsg.includes('telefono_p1') || errMsg.includes('telefono_p2') || errMsg.includes('telefono_p3')) {
            setFieldErrors(prev => ({ ...prev, telefono_p1: "¡Pilas! Este número ya está registrado en otro equipo." }));
          } else {
            setError("¡Pilas! Un dato ingresado ya está registrado. Revisen el formulario.");
          }

          setLoading(false);
          return;
        }

        // Si es otro tipo de error
        throw supabaseError;
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Hubo un error al registrar el equipo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-4 text-center max-w-lg mx-auto"
      >
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-white mb-4">¡Equipo Registrado!</h2>
        <p className="text-xl text-gray-400 mb-10">Prepárense para romper el sistema. Ahora, asegúrate de unirte a nuestra comunidad para recibir todas las actualizaciones de la Hackathon.</p>

        <div className="flex flex-col gap-4 w-full">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="w-full py-4 bg-[#25D366] hover:bg-[#20b858] text-white font-bold rounded-lg text-lg transition-colors shadow-[0_0_15px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Únete al Grupo de WhatsApp
          </a>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-bold rounded-lg text-lg transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 py-20 relative"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-8 md:left-8 px-5 py-2.5 bg-gradient-to-b from-red-500 to-red-700 border-t-2 border-t-red-300 border-x border-x-red-600 border-b-4 border-b-red-900 rounded-xl text-white font-black shadow-[0_5px_15px_rgba(220,38,38,0.5)] hover:brightness-110 active:translate-y-1 active:border-b-0 active:mb-1 transition-all flex items-center gap-2 z-50"
        >
          ← Volver
        </button>
      )}
      <div className="w-full max-w-2xl backdrop-blur-md bg-black/60 border border-red-900/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.15)] relative mt-10">
        <h2 className="text-3xl font-black text-white mb-2 text-center uppercase tracking-wider">
          Registro a la Hackathon
        </h2>
        <p className="text-gray-400 text-center mb-8">Ingresa los datos de tu escuadrón</p>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-2xl shadow-lg">
            <label className="block text-sm font-medium text-red-500 mb-2 uppercase tracking-wide">Nombre del Equipo</label>
            <input
              required
              name="nombre_equipo"
              value={formData.nombre_equipo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-black/50 border ${fieldErrors.nombre_equipo ? 'border-red-500 focus:border-red-500' : 'border-red-900/50'} rounded-xl px-4 py-4 text-xl text-white font-bold focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600 shadow-inner`}
              placeholder="Ej: Los Hackers de la Noche"
            />
            {fieldErrors.nombre_equipo && <p className="text-red-500 text-sm mt-2 font-bold animate-pulse">{fieldErrors.nombre_equipo}</p>}
          </div>

          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl shadow-lg hover:border-gray-700 transition-colors">
            <h3 className="text-red-500 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Participante 1 (Líder)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                <input
                  required
                  name="nombre_p1"
                  value={formData.nombre_p1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-black/50 border ${fieldErrors.nombre_p1 ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600`}
                  placeholder="Ej: Ada Lovelace"
                />
                {fieldErrors.nombre_p1 && <p className="text-red-500 text-xs mt-1 font-bold">{fieldErrors.nombre_p1}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                <input
                  required
                  name="telefono_p1"
                  type="tel"
                  value={formData.telefono_p1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-black/50 border ${fieldErrors.telefono_p1 ? 'border-red-500 focus:border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600`}
                  placeholder="09XXXXXXXX"
                />
                {fieldErrors.telefono_p1 && <p className="text-red-500 text-xs mt-1 font-bold animate-pulse">{fieldErrors.telefono_p1}</p>}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl shadow-lg hover:border-gray-700 transition-colors">
            <h3 className="text-gray-300 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
              <User className="w-5 h-5" />
              Participante 2
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                <input
                  required
                  name="nombre_p2"
                  value={formData.nombre_p2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-black/50 border ${fieldErrors.nombre_p2 ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600`}
                  placeholder="Ej: Alan Turing"
                />
                {fieldErrors.nombre_p2 && <p className="text-red-500 text-xs mt-1 font-bold">{fieldErrors.nombre_p2}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                <input
                  required
                  name="telefono_p2"
                  type="tel"
                  value={formData.telefono_p2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-black/50 border ${fieldErrors.telefono_p2 ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600`}
                  placeholder="09XXXXXXXX"
                />
                {fieldErrors.telefono_p2 && <p className="text-red-500 text-xs mt-1 font-bold">{fieldErrors.telefono_p2}</p>}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl shadow-lg hover:border-gray-700 transition-colors">
            <h3 className="text-gray-300 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-5 h-5" />
              Participante 3
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nombre Completo</label>
                <input
                  required
                  name="nombre_p3"
                  value={formData.nombre_p3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-black/50 border ${fieldErrors.nombre_p3 ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600`}
                  placeholder="Ej: Linus Torvalds"
                />
                {fieldErrors.nombre_p3 && <p className="text-red-500 text-xs mt-1 font-bold">{fieldErrors.nombre_p3}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                <input
                  required
                  name="telefono_p3"
                  type="tel"
                  value={formData.telefono_p3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-black/50 border ${fieldErrors.telefono_p3 ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600`}
                  placeholder="09XXXXXXXX"
                />
                {fieldErrors.telefono_p3 && <p className="text-red-500 text-xs mt-1 font-bold">{fieldErrors.telefono_p3}</p>}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-lg transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Confirmar Registro"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
