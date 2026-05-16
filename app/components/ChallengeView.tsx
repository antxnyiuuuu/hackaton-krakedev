"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

export function ChallengeView({ onNext }: Props) {
  const [posPermiso, setPosPermiso] = useState({ x: 0, y: 0 });
  const [posAhuevo, setPosAhuevo] = useState({ x: 0, y: 0 });
  const [posLejos, setPosLejos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);

  // Estados para el Easter Egg Admin
  const [clickCount, setClickCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");

  // Deshabilitar scroll y estiramiento de pantalla cuando la landing está activa
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

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

  const getRandomPosition = () => {
    if (typeof window !== "undefined") {
      const maxX = window.innerWidth / 2 - 120;
      const maxY = window.innerHeight / 2 - 60;
      const x = (Math.random() - 0.5) * maxX * 1.6;
      const y = (Math.random() - 0.5) * maxY * 1.6;
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const handlePermisoHover = () => {
    setPosPermiso(getRandomPosition());
    setYesScale((prev) => Math.min(prev * 1.2, 2.5));
  };

  const handleAhuevoHover = () => {
    setPosAhuevo(getRandomPosition());
    setYesScale((prev) => Math.min(prev * 1.2, 2.5));
  };

  const handleLejosHover = () => {
    setPosLejos(getRandomPosition());
    setYesScale((prev) => Math.min(prev * 1.2, 2.5));
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
        className="mb-2 sm:mb-3 w-full flex justify-center"
      >
        <span className="bg-red-950/60 border border-red-500/50 text-red-400 px-3 py-1 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase shadow-[0_0_10px_rgba(220,38,38,0.2)]">
          La hackatón más brutal del año
        </span>
      </motion.div>

      {/* Logo | separador | titular */}
      <div className="relative z-50 mb-4 sm:mb-6 flex w-full flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
        <div className="relative shrink-0 flex items-center justify-center">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full bg-red-600/20 blur-xl sm:blur-2xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src="/images.png"
            alt="Krakedev Logo"
            onClick={handleLogoClick}
            className="relative h-16 w-auto max-h-[15vh] object-contain cursor-pointer sm:h-20 md:h-24 drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]"
            animate={{
              y: [0, -4, 0],
              rotate: [-1.5, 1.5, -1.5],
              scale: [1, 1.02, 1],
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
          className="hidden md:block shrink-0 w-px h-16 bg-gradient-to-b from-transparent via-red-500/55 to-transparent rounded-full"
          aria-hidden
        />

        <div className="min-w-0 flex-1 flex flex-col items-center md:items-start text-center md:text-left px-1 sm:px-2">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-black tracking-tighter text-white leading-[1.08] text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl uppercase [text-shadow:0_2px_32px_rgba(0,0,0,0.55)]"
          >
            ¿Te atreves a enfrentar{" "}
            <span className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(220,38,38,0.65)]">
              el RETO?
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-gray-400 font-bold text-[10px] sm:text-xs md:text-sm mt-2 uppercase tracking-widest bg-red-950/20 border border-red-900/30 px-3 py-1 rounded"
          >
            {"<developer_mode_active />"} Solo para desarrolladores ultra Pro
          </motion.p>
        </div>
      </div>

      {/* Super Big Prize Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="w-full max-w-sm sm:max-w-md bg-gradient-to-br from-yellow-950/20 via-red-950/15 to-black/90 border border-yellow-500/50 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.15)] hover:shadow-[0_0_30px_rgba(234,179,8,0.25)] hover:border-yellow-400 transition-all duration-500 text-center mb-5 sm:mb-6 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.12)_0%,transparent_70%)] pointer-events-none" />
        <span className="font-mono tracking-widest text-[11px] sm:text-xs uppercase block mb-1.5 font-black">
          <span className="text-red-500">const</span> <span className="text-white">GRAND_PRIZE</span> <span className="text-gray-400">=</span>
        </span>
        <h2 className="font-mono font-black leading-none flex items-baseline justify-center gap-1.5 select-all py-1.5">
          <span className="text-yellow-400 text-4xl min-[380px]:text-5xl sm:text-6xl drop-shadow-[0_0_25px_rgba(234,179,8,0.75)] tracking-tighter animate-pulse">
            1.894.737.48
          </span>
          <span className="text-xs sm:text-sm md:text-base font-mono font-black text-yellow-500/80 uppercase tracking-widest self-end pb-1.5">
            cop
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mt-2 font-semibold leading-relaxed">
          ¿Te vas a quedar fuera o vas a demostrar de qué estás hecho?
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 relative w-full max-w-lg sm:max-w-xl z-50">
        <motion.button
          onClick={onNext}
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.03 }}
          whileTap={{ scale: yesScale * 0.98 }}
          className="col-span-2 min-h-[3.25rem] px-4 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-xs sm:text-sm rounded-xl hover:from-red-500 hover:to-red-700 shadow-[0_0_16px_rgba(220,38,38,0.35)] transition-all relative border border-red-500/50 uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          DE UNA, ME APUNTO
        </motion.button>

        <motion.button
          animate={{ x: posPermiso.x, y: posPermiso.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={handlePermisoHover}
          onClick={handlePermisoHover}
          className="min-h-[2.75rem] px-3 py-2 bg-black/50 backdrop-blur-sm text-gray-400 font-bold text-xs sm:text-sm rounded-lg border border-gray-800 hover:text-white hover:border-gray-500 transition-colors cursor-pointer"
        >
          No me dan permiso
        </motion.button>

        <motion.button
          animate={{ x: posAhuevo.x, y: posAhuevo.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={handleAhuevoHover}
          onClick={handleAhuevoHover}
          className="min-h-[2.75rem] px-3 py-2 bg-black/50 backdrop-blur-sm text-gray-400 font-bold text-xs sm:text-sm rounded-lg border border-gray-800 hover:text-white hover:border-gray-500 transition-colors cursor-pointer"
        >
          Me ahuevo
        </motion.button>

        <motion.button
          animate={{ x: posLejos.x, y: posLejos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={handleLejosHover}
          onClick={handleLejosHover}
          className="col-span-2 min-h-[2.75rem] px-3 py-2 bg-black/50 backdrop-blur-sm text-gray-400 font-bold text-xs sm:text-sm rounded-lg border border-gray-800 hover:text-white hover:border-gray-500 transition-colors cursor-pointer"
        >
          Vivo lejos
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
