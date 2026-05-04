"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin, Users } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack?: () => void;
}

export function PrizeView({ onNext, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-20 relative"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-8 md:left-8 px-5 py-2.5 bg-gradient-to-b from-red-500 to-red-700 border-t-2 border-t-red-300 border-x border-x-red-600 border-b-4 border-b-red-900 rounded-xl text-white font-black shadow-[0_5px_15px_rgba(220,38,38,0.5)] hover:brightness-110 active:translate-y-1 active:border-b-0 active:mb-1 transition-all flex items-center gap-2 z-50"
        >
          ← Volver
        </button>
      )}

      <div className="mb-10 w-full flex justify-center mt-12 md:mt-0 relative z-10">
        <img
          src="/images.png"
          alt="Krakedev Logo"
          className="h-24 md:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]"
        />
      </div>

      <div className="relative mb-12 mt-8 w-full flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.3)_0%,transparent_70%)] rounded-full"
        />
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 relative z-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
        <h2 className="text-xl md:text-3xl text-red-500 font-bold mb-2 relative z-10 tracking-widest uppercase">
          La Gran Hackathon Krakedev
        </h2>
        <h2 className="text-5xl md:text-8xl font-black mb-4 relative z-10 bg-gradient-to-br from-white via-red-100 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(220,38,38,0.6)] leading-tight">
          ¡GANA HASTA <br className="md:hidden" /> $1.950.000 COP!
        </h2>
        <p className="text-2xl text-white font-bold relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mt-4 mb-10">
          No te ahueves, ¡es hora de facturar!
        </p>

        {/* CTA Principal - Movido arriba y más grande */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group overflow-hidden w-full max-w-xl px-8 py-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-2xl md:text-4xl shadow-[0_0_40px_rgba(220,38,38,0.8)] hover:shadow-[0_0_60px_rgba(220,38,38,1)] transition-all z-20 border border-red-500/50 uppercase tracking-widest"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 drop-shadow-md">¡Regístrate Ahora!</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 text-gray-400 max-w-5xl w-full z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-3 p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-red-900/50 transition-colors"
        >
          <Calendar className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] mb-2" />
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">48 Horas</h3>
          <p className="text-gray-400 font-medium">A puro ñeque, sin parar</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-3 p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-red-900/50 transition-colors"
        >
          <MapPin className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] mb-2" />
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">100% Presencial</h3>
          <p className="text-gray-400 font-medium">Avispas en sede Krakedev</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center gap-3 p-8 rounded-2xl backdrop-blur-md bg-black/40 border border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-red-900/50 transition-colors"
        >
          <Users className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] mb-2" />
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">Equipos de 3</h3>
          <p className="text-gray-400 font-medium">Saca tus 3 enfermos</p>
        </motion.div>
      </div>




    </motion.div>
  );
}
