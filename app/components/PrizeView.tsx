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

      {/* Pulpo | línea | trofeo + textos */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-3 mt-10 md:mt-4 mb-6 flex flex-row items-stretch justify-center gap-2 sm:gap-3 md:gap-4">
        <div className="relative shrink-0 flex items-center justify-center">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full bg-red-600/25 blur-2xl sm:blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/images.png"
            alt="Krakedev Logo"
            className="relative h-24 w-auto max-h-[22vh] object-contain sm:h-28 md:h-32 drop-shadow-[0_0_16px_rgba(220,38,38,0.75)]"
            animate={{
              y: [0, -8, 0],
              rotate: [-3, 3, -3],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          />
        </div>

        <div
          className="shrink-0 w-px bg-gradient-to-b from-transparent via-red-500/55 to-transparent rounded-full"
          aria-hidden
        />

        <div className="min-w-0 flex-1 flex flex-col items-center justify-center gap-2 sm:gap-2.5 px-1 text-center">
          <motion.div
            className="relative z-10 mb-0.5 text-yellow-500 drop-shadow-[0_0_12px_rgba(234,179,8,0.75)]"
            animate={{
              y: [0, -6, 0],
              rotate: [4, -4, 4],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.15,
            }}
          >
            <Trophy className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" strokeWidth={2.2} />
          </motion.div>
          <h2 className="text-xs sm:text-sm md:text-base lg:text-lg text-red-500 font-bold tracking-widest uppercase leading-tight">
            La Gran Hackathon Krakedev
          </h2>
          <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] bg-gradient-to-br from-white via-red-100 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(220,38,38,0.5)]">
            ¡GANA HASTA $1.950.000 COP!
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] leading-snug max-w-[18rem] sm:max-w-xl mx-auto">
            No te ahueves, ¡es hora de facturar!
          </p>
        </div>
      </div>

      <div className="relative mb-10 w-full max-w-lg sm:max-w-xl mx-auto px-3 flex justify-center z-20">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative group overflow-hidden w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-sm sm:text-base md:text-lg shadow-[0_0_24px_rgba(220,38,38,0.5)] hover:shadow-[0_0_36px_rgba(220,38,38,0.65)] transition-all border border-red-500/50 uppercase tracking-wide"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 drop-shadow-md">¡Regístrate Ahora!</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8 text-gray-400 max-w-4xl w-full z-10 px-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col items-center gap-2 p-4 rounded-xl backdrop-blur-md bg-black/40 border border-gray-800 shadow-[0_0_14px_rgba(0,0,0,0.45)] hover:border-red-900/50 transition-colors"
        >
          <Calendar className="w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.7)] shrink-0" />
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">48 Horas</h3>
          <p className="text-gray-400 text-xs sm:text-sm font-medium leading-snug">A puro ñeque, sin parar</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col items-center gap-2 p-4 rounded-xl backdrop-blur-md bg-black/40 border border-gray-800 shadow-[0_0_14px_rgba(0,0,0,0.45)] hover:border-red-900/50 transition-colors"
        >
          <MapPin className="w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.7)] shrink-0" />
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">100% Presencial</h3>
          <p className="text-gray-400 text-xs sm:text-sm font-medium leading-snug">Avispas en sede Krakedev</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col items-center gap-2 p-4 rounded-xl backdrop-blur-md bg-black/40 border border-gray-800 shadow-[0_0_14px_rgba(0,0,0,0.45)] hover:border-red-900/50 transition-colors"
        >
          <Users className="w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.7)] shrink-0" />
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">Equipos de 3</h3>
          <p className="text-gray-400 text-xs sm:text-sm font-medium leading-snug">Saca tus 3 enfermos</p>
        </motion.div>
      </div>




    </motion.div>
  );
}
