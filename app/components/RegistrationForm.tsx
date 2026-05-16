"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { registerTeam, checkTeamExists } from "@/app/actions/register";
import { User, Users, ShieldAlert, Sparkles } from "lucide-react";

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
    nombre_p3: "Antigravity",
    telefono_p3: "",
  });

  const [isCustomAI, setIsCustomAI] = useState(false);
  const [customAIVal, setCustomAIVal] = useState("");

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
          { name: "telefono_p2", val: formData.telefono_p2 }
        ];
        const duplicates = phones.filter(p => p.val === value && p.name !== name && p.val.trim() !== "");
        if (duplicates.length > 0) {
          newError = "Este teléfono ya está ingresado en el equipo";
        }
      }
    }

    if (name.startsWith("nombre_p") && name !== "nombre_p3" && value.trim() !== "") {
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!nameRegex.test(value)) {
        newError = "Solo se permiten letras y espacios";
      }
    }

    if (name === "nombre_equipo" && value.trim() !== "") {
      const exists = await checkTeamExists(value);
      if (exists) {
        newError = "¡Este equipo ya existe!";
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
      const phones = [formData.telefono_p1, formData.telefono_p2];

      if (!phones.every((p) => phoneRegex.test(p))) {
        setError("Todos los teléfonos deben tener exactamente 10 dígitos, empezar con '09' y sin duplicados.");
        setLoading(false);
        return;
      }

      // 1.5 Validar formato de nombres
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      const humanNames = [formData.nombre_p1, formData.nombre_p2];
      if (!humanNames.every((n) => nameRegex.test(n))) {
        setError("Los nombres de los participantes humanos solo pueden contener letras y espacios.");
        setLoading(false);
        return;
      }

      // 2. Validar que los teléfonos no se repitan
      if (formData.telefono_p1 === formData.telefono_p2) {
        setError("Los números de teléfono de los participantes no pueden repetirse.");
        setLoading(false);
        return;
      }

      // 2.5 Validar Copiloto IA seleccionado
      if (!formData.nombre_p3 || formData.nombre_p3.trim() === "" || formData.nombre_p3 === "Otro") {
        setError("Por favor, escribe o selecciona a tu copiloto Inteligencia Artificial.");
        setLoading(false);
        return;
      }

      // 3. Insertar datos usando el Server Action
      const result = await registerTeam({
        ...formData,
        nombre_equipo: formData.nombre_equipo.trim(),
        telefono_p3: null, // ¡La IA no tiene teléfono!
      });

      if (!result.success) {
        setError(result.error || "Hubo un error al registrar el equipo.");
        setLoading(false);
        return;
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
        <h2 className="text-4xl font-black text-white mb-3 text-center uppercase tracking-wider animate-pulse">
          Registro a la Hackathon
        </h2>
        <p className="text-base sm:text-lg text-gray-300 font-semibold text-center mb-10">Ingresa los datos de tu escuadrón para codear como locos</p>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-2xl shadow-lg">
            <label className="block text-xs sm:text-sm font-mono font-bold text-red-500 mb-2 uppercase tracking-wide">const team_name =</label>
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
            <h3 className="text-red-500 font-mono font-bold text-base sm:text-lg mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              {"[leader_p1]"} Participante 1 (Líder)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-mono font-bold text-gray-400 mb-1">let full_name =</label>
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
                <label className="block text-xs sm:text-sm font-mono font-bold text-gray-400 mb-1">let phone =</label>
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
            <h3 className="text-gray-300 font-mono font-bold text-base sm:text-lg mb-4 uppercase tracking-wider flex items-center gap-2">
              <User className="w-5 h-5" />
              {"[dev_p2]"} Participante 2
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-mono font-bold text-gray-400 mb-1">let full_name =</label>
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
                <label className="block text-xs sm:text-sm font-mono font-bold text-gray-400 mb-1">let phone =</label>
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
            <h3 className="text-yellow-500 font-mono font-bold text-base sm:text-lg mb-2 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              {"[copilot_p3]"} Copiloto IA (Integrante 3)
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed font-semibold">
              El tercer integrante del equipo debe ser una Inteligencia Artificial para potenciar sus desarrollos. ¡Selecciona tu copiloto favorito!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Cursor", desc: "El editor inteligente enfocado en velocidad.", color: "from-blue-600/20 to-blue-900/40 border-blue-500/40 text-blue-400 hover:border-blue-400" },
                { name: "Antigravity", desc: "El agente poderoso de Deepmind para coding.", color: "from-red-600/20 to-red-900/40 border-red-500/40 text-red-400 hover:border-red-400" },
                { name: "Claude", desc: "La IA poética con razonamiento avanzado.", color: "from-amber-600/20 to-amber-900/40 border-amber-500/40 text-amber-400 hover:border-amber-400" },
                { name: "Otro", desc: "Escribe tu propia Inteligencia Artificial.", color: "from-purple-600/20 to-purple-900/40 border-purple-500/40 text-purple-400 hover:border-purple-400" }
              ].map((ai) => {
                const isSelected = ai.name === "Otro" ? isCustomAI : (!isCustomAI && formData.nombre_p3 === ai.name);
                return (
                  <button
                    key={ai.name}
                    type="button"
                    onClick={() => {
                      if (ai.name === "Otro") {
                        setIsCustomAI(true);
                        setFormData(prev => ({ ...prev, nombre_p3: customAIVal }));
                      } else {
                        setIsCustomAI(false);
                        setFormData(prev => ({ ...prev, nombre_p3: ai.name }));
                      }
                      setFieldErrors(prev => ({ ...prev, nombre_p3: "" }));
                    }}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected 
                        ? `${ai.color} bg-black/60 shadow-[0_0_20px_rgba(220,38,38,0.15)] ring-2 ring-red-500/50` 
                        : "border-gray-800 bg-black/30 text-gray-400 hover:bg-black/50 hover:text-white"
                    }`}
                  >
                    <span className="font-mono text-sm sm:text-base font-black uppercase tracking-wider block mb-1">
                      {ai.name}
                    </span>
                    <span className="text-[10px] text-gray-500 leading-normal block">
                      {ai.desc}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1 right-1 text-[8px] font-mono bg-red-600 text-white font-extrabold px-1 rounded uppercase tracking-widest animate-pulse">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {isCustomAI && (
              <div className="mt-4 bg-black/40 border border-gray-800 p-4 rounded-xl animate-fadeIn">
                <label className="block text-xs sm:text-sm font-mono font-bold text-gray-400 mb-2">let custom_copilot =</label>
                <input
                  required
                  value={customAIVal}
                  onChange={(e) => {
                    setCustomAIVal(e.target.value);
                    setFormData(prev => ({ ...prev, nombre_p3: e.target.value }));
                  }}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-600 font-bold"
                  placeholder="Ej: ChatGPT, Gemini, Llama 3..."
                />
              </div>
            )}
            
            {fieldErrors.nombre_p3 && <p className="text-red-500 text-sm mt-3 font-bold animate-pulse text-center">{fieldErrors.nombre_p3}</p>}
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black rounded-xl text-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider"
            >
              {loading ? "Registrando a los cracks..." : "Confirmar Registro"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
