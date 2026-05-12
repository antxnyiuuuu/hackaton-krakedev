"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

export function ChallengeView({ onNext }: Props) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  // Estados para el Easter Egg Admin
  const [clickCount, setClickCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setShowAdmin(true);
        return 0; // Reiniciar contador
      }
      return newCount;
    });

    // Resetear contador después de 2 segundos de inactividad
    setTimeout(() => setClickCount(0), 2000);
  };

  const handleAdminAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError("");

    try {
      const response = await fetch('/api/admin/exportar', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });

      if (!response.ok) {
        throw new Error('Acceso Denegado');
      }

      // Si es válido, guardar token temporal y redirigir
      sessionStorage.setItem("admin_token", password);
      window.location.href = "/admin-panel";
    } catch (err: any) {
      setAdminError(err.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleNoHover = () => {
    if (typeof window !== "undefined") {
      const maxX = window.innerWidth / 2 - 100;
      const maxY = window.innerHeight / 2 - 50;
      const x = (Math.random() - 0.5) * maxX * 1.8;
      const y = (Math.random() - 0.5) * maxY * 1.8;
      setNoPosition({ x, y });
      setYesScale((prev) => prev * 1.4);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[100dvh] min-h-screen py-6 sm:py-8 px-3 sm:px-4 w-full max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="mb-2.5 sm:mb-3 w-full flex justify-center"
      >
        <span className="bg-red-900/40 border border-red-500/50 text-red-400 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-[0_0_10px_rgba(220,38,38,0.2)]">
          La Hackathon más brutal del año
        </span>
      </motion.div>

      {/* Logo | separador | titular (siempre en fila) */}
      <div className="relative z-50 mb-4 sm:mb-5 flex w-full flex-row items-stretch justify-center gap-2 sm:gap-3 md:gap-4">
        <div className="relative shrink-0 flex items-center justify-center">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full bg-red-600/25 blur-2xl sm:blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/images.png"
            alt="Krakedev Logo"
            onClick={handleLogoClick}
            className="relative h-28 w-auto max-h-[26vh] object-contain cursor-pointer sm:h-32 md:h-40 drop-shadow-[0_0_16px_rgba(220,38,38,0.75)]"
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
            whileTap={{ scale: 0.98 }}
          />
        </div>

        <div
          className="shrink-0 w-px bg-gradient-to-b from-transparent via-red-500/55 to-transparent rounded-full"
          aria-hidden
        />

        <div className="min-w-0 flex-1 flex items-center justify-center px-1 sm:px-2">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-black tracking-tighter text-white leading-[1.08] text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl [text-shadow:0_2px_32px_rgba(0,0,0,0.55)]"
          >
            ¿Pilas para codear{" "}
            <span className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(220,38,38,0.75)]">
              o te vas a ahuevar?
            </span>
          </motion.h1>
        </div>
      </div>

      <div className="flex flex-row flex-nowrap items-stretch justify-center gap-2 sm:gap-2.5 relative w-full max-w-lg sm:max-w-xl">
        <motion.button
          onClick={onNext}
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.02 }}
          whileTap={{ scale: yesScale * 0.98 }}
          className="min-h-[2.75rem] flex-1 min-w-0 basis-0 px-3 py-2.5 bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-xs sm:text-sm rounded-lg hover:from-red-500 hover:to-red-700 shadow-[0_0_16px_rgba(220,38,38,0.35)] transition-colors z-50 relative border border-red-500/50 leading-snug"
        >
          ¡DE UNA, LE METO ÑEQUE!
        </motion.button>

        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={handleNoHover}
          onClick={handleNoHover}
          className="min-h-[2.75rem] flex-1 min-w-0 basis-0 px-3 py-2.5 bg-black/40 backdrop-blur-sm text-gray-400 font-bold text-xs sm:text-sm rounded-lg border border-gray-800 hover:text-white hover:border-gray-500 transition-colors leading-snug"
        >
          Me ahuevo...
        </motion.button>
      </div>

      {/* Admin Modal (Easter Egg) */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="bg-gray-900 border border-red-600/50 p-8 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.3)] w-full max-w-sm relative">
              <button 
                onClick={() => setShowAdmin(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-2xl font-black text-red-500 mb-6 uppercase tracking-widest text-center">
                Terminal
              </h2>
              
              <form onSubmit={handleAdminAccess} className="flex flex-col gap-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoFocus
                  className="bg-black border border-gray-800 focus:border-red-500 text-green-500 font-mono px-4 py-3 rounded outline-none transition-colors"
                />
                {adminError && <p className="text-red-500 text-sm font-mono text-center">{adminError}</p>}
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="w-full bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600 font-mono font-bold py-3 rounded transition-all disabled:opacity-50"
                >
                  {adminLoading ? "EXTRAYENDO..." : "ACCEDER"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
