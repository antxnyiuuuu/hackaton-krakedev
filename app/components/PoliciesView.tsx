"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack?: () => void;
}

export function PoliciesView({ onNext, onBack }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 relative"
    >
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 md:top-8 md:left-8 px-5 py-2.5 bg-gradient-to-b from-red-500 to-red-700 border-t-2 border-t-red-300 border-x border-x-red-600 border-b-4 border-b-red-900 rounded-xl text-white font-black shadow-[0_5px_15px_rgba(220,38,38,0.5)] hover:brightness-110 active:translate-y-1 active:border-b-0 active:mb-1 transition-all flex items-center gap-2 z-50"
        >
          ← Volver
        </button>
      )}
      <div className="w-full max-w-3xl backdrop-blur-md bg-black/40 border border-gray-800 rounded-2xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
        
        <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-6">
          <ShieldCheck className="w-8 h-8 text-red-500" />
          <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Políticas de la Hackathon</h2>
        </div>

        <div className="space-y-4 h-64 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-gray-900/40 border border-gray-800 p-4 rounded-xl hover:border-gray-700 transition-colors">
            <h3 className="text-red-500 font-bold mb-2">1. Compromiso Hacker</h3>
            <p className="text-sm">
              Al inscribirte a la hackathon, te comprometes a entregar todo tu ñeque durante las 48 horas. No se aceptan deserciones a menos que la computadora explote (literalmente).
            </p>
          </div>
          
          <div className="bg-gray-900/40 border border-gray-800 p-4 rounded-xl hover:border-gray-700 transition-colors">
            <h3 className="text-gray-300 font-bold mb-2">2. Propiedad Intelectual</h3>
            <p className="text-sm">
              Todo el código escrito durante el evento pertenece al equipo creador. Sin embargo, Krakedev se reserva el derecho de usar capturas y demostraciones para promocionar a los cracks del mañana.
            </p>
          </div>
          
          <div className="bg-gray-900/40 border border-gray-800 p-4 rounded-xl hover:border-gray-700 transition-colors">
            <h3 className="text-gray-300 font-bold mb-2">3. Conducta de Supervivencia</h3>
            <p className="text-sm">
              Está estrictamente prohibido sabotear el código de otros equipos. El uso de energía oscura, ataques DDoS a compañeros o desconectar cables "por accidente" resultará en descalificación inmediata.
            </p>
          </div>
          
          <div className="bg-gray-900/40 border border-gray-800 p-4 rounded-xl hover:border-gray-700 transition-colors">
            <h3 className="text-gray-300 font-bold mb-2">4. Presencialidad Total</h3>
            <p className="text-sm">
              Este evento es 100% presencial. Tendremos pizza, café infinito y colchonetas. Si sales del búnker antes de que suene la alarma final, tu equipo pierde puntos de honor.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          >
            Aceptar y Continuar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
