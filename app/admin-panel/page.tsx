"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Download, LogOut, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPanel() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      router.push("/");
      return;
    }

    fetch("/api/admin/exportar", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("No autorizado");
      return res.json();
    })
    .then(json => {
      setData(json.data || []);
      setLoading(false);
    })
    .catch(() => {
      sessionStorage.removeItem("admin_token");
      router.push("/");
    });
  }, [router]);

  const handleExport = () => {
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
    XLSX.writeFile(workbook, "registros_hackaton.xlsx");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    router.push("/");
  };

  const toggleRow = (index: number) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center font-bold text-xl">
        Cargando registros...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 md:p-8 selection:bg-red-500 selection:text-white">
      {/* Background decorations similares a la landing */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[150%] h-[150%] md:w-[40%] md:h-[40%] bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.3)_0%,transparent_60%)] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[150%] h-[150%] md:w-[30%] md:h-[30%] bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.2)_0%,transparent_60%)] rounded-full mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <img 
            src="/images.png" 
            alt="Krakedev Logo" 
            className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.4)]" 
          />
          <div className="flex gap-4">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] whitespace-nowrap"
            >
              <Download className="w-5 h-5" />
              Exportar a Excel
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 backdrop-blur-sm bg-gray-900/50 border border-gray-700 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors whitespace-nowrap"
            >
              <LogOut className="w-5 h-5" />
              Salir
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-black text-white">
            Equipos Registrados <span className="text-red-500">({data.length})</span>
          </h1>
        </div>

        <div className="space-y-4">
          {data.length === 0 ? (
            <div className="backdrop-blur-md bg-black/40 border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
              No hay equipos registrados todavía.
            </div>
          ) : (
            data.map((row, i) => {
              const isExpanded = expandedRows[i];
              return (
                <div 
                  key={i} 
                  className="backdrop-blur-md bg-black/40 border border-gray-800 rounded-2xl overflow-hidden shadow-lg transition-colors hover:border-gray-700"
                >
                  {/* Header de la tarjeta (Siempre visible) */}
                  <div 
                    onClick={() => toggleRow(i)}
                    className="p-6 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="text-xs text-red-500 font-bold mb-1 uppercase tracking-wider">
                        {row.fecha_registro ? (
                          <>
                            {new Date(row.fecha_registro).toLocaleDateString()} - {new Date(row.fecha_registro).toLocaleTimeString()}
                          </>
                        ) : (
                          "Sin fecha"
                        )}
                      </div>
                      <h2 className="text-2xl font-black text-white mb-1">{row.nombre_equipo}</h2>
                      <p className="text-gray-400">
                        <span className="font-bold text-gray-300">Líder:</span> {row.nombre_p1} <span className="text-gray-500 text-sm">({row.telefono_p1})</span>
                      </p>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors bg-gray-900/50 p-2 rounded-full border border-gray-800">
                      {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </button>
                  </div>

                  {/* Contenido expandible */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-800/50 bg-gray-900/30"
                      >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Participante 2 */}
                          <div className="bg-black/50 p-4 rounded-xl border border-gray-800">
                            <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Participante 2</h3>
                            <p className="text-white font-bold text-lg">{row.nombre_p2}</p>
                            <p className="text-red-400 font-mono mt-1">{row.telefono_p2}</p>
                          </div>
                          
                          {/* Participante 3 */}
                          <div className="bg-black/50 p-4 rounded-xl border border-gray-800">
                            <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">Participante 3</h3>
                            <p className="text-white font-bold text-lg">{row.nombre_p3}</p>
                            <p className="text-red-400 font-mono mt-1">{row.telefono_p3}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
