"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";

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
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      <div className="mb-10 relative z-50 group">
        <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <img 
          src="/images.png" 
          alt="Krakedev Logo" 
          onClick={handleLogoClick}
          className="relative h-40 md:h-64 w-auto object-contain mx-auto opacity-100 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] cursor-pointer transition-transform duration-500 hover:scale-105" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <span className="bg-red-900/40 border border-red-500/50 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          La Hackathon más brutal del año
        </span>
      </motion.div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 max-w-5xl text-white leading-tight">
        ¿Pilas para codear<br className="hidden md:block" />
        <span className="bg-gradient-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]"> o te vas a ahuevar?</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-6 relative">
        <motion.button
          onClick={onNext}
          animate={{ scale: yesScale }}
          whileHover={{ scale: yesScale * 1.05 }}
          whileTap={{ scale: yesScale * 0.95 }}
          className="px-12 py-6 bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-xl md:text-2xl rounded-2xl hover:from-red-500 hover:to-red-700 shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all z-50 relative border border-red-500/50"
        >
          ¡DE UNA, LE METO ÑEQUE!
        </motion.button>

        <motion.button
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={handleNoHover}
          onClick={handleNoHover}
          className="px-10 py-5 bg-black/40 backdrop-blur-sm text-gray-500 font-bold text-lg md:text-xl rounded-2xl border border-gray-800 hover:text-white hover:border-gray-500 transition-colors"
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
