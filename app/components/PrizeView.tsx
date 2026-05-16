"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper component for modern, ultra-responsive typewriter typing animations
function TypewriterText({ 
  text, 
  speed = 25, 
  delay = 0,
  className = "" 
}: { 
  text: string; 
  speed?: number; 
  delay?: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay, text]);

  useEffect(() => {
    if (!started) return;
    let currentIndex = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return <span className={className}>{displayedText}</span>;
}
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Gamepad2, 
  Utensils, 
  Flame, 
  Sparkles, 
  CheckCircle,
  Coffee,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Props {
  onNext: () => void;
  onBack?: () => void;
}

export function PrizeView({ onNext, onBack }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 0,
      tabTitle: "QUIÉNES",
      title: "La Comunidad Krakedev & Clear Minds",
      icon: <Users className="w-6 h-6 text-red-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
            Esta no es una competencia ordinaria. Nos reunimos aquellos locos que llevan la tecnología en la sangre:
          </p>
          <div className="bg-black/35 border border-gray-800/80 p-4 rounded-xl space-y-2">
            <span className="text-red-400 font-mono text-xs uppercase tracking-wider block font-bold">const ACCESS_LIST =</span>
            <p className="text-base text-white font-semibold leading-relaxed">
              Integrantes y ex-integrantes de <span className="text-red-400 font-black">Clear</span>, colaboradores bajo honorarios, allegados y estudiantes destacados de los módulos avanzados de <span className="text-red-400 font-black">Krake Dev</span>.
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-950/30 to-black border border-red-800/30 p-3.5 rounded-xl text-center">
            <span className="text-white font-extrabold text-base sm:text-lg italic block">
              <TypewriterText text="¡Porque una vez Clear... SIEMPRE Clear!" speed={25} />
            </span>
            <span className="text-xs text-gray-400 block mt-1">
              <TypewriterText text="Todos los locos y enfermos del código de Krakedev son bienvenidos en esta edición brutal." speed={20} delay={900} />
            </span>
          </div>
        </div>
      )
    },
    {
      id: 1,
      tabTitle: "PROYECTO",
      title: "Desarrollo de Videojuegos y Reglas",
      icon: <Gamepad2 className="w-6 h-6 text-red-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
            El reto es directo: Desarrollar juegos simples en <code className="font-mono bg-red-950/45 border border-red-900/30 px-2 py-0.5 rounded text-red-400 font-bold">"JavaScript puro"</code> diseñados para niños y jóvenes de <code className="font-mono bg-black/50 border border-gray-850 px-2 py-0.5 rounded text-white font-bold">6_to_17_years</code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-black/30 border border-gray-800 p-4.5 rounded-lg flex gap-2.5">
              <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-200">
                <strong className="text-white">Evaluación Real:</strong> Calificado con estrellas por niños de colegios bajo convenio.
              </span>
            </div>
            <div className="bg-black/30 border border-gray-800 p-4.5 rounded-lg flex gap-2.5">
              <CheckCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-200">
                <strong className="text-white">Propiedad Intelectual:</strong> Todo el código y assets pertenecen a Clear Minds.
              </span>
            </div>
          </div>
          <div className="bg-red-950/35 border border-red-900/50 p-3.5 rounded-lg text-center">
            <span className="font-mono text-xs text-red-400 block uppercase tracking-widest font-bold">
              <TypewriterText text="LA TEMÁTICA OFICIAL" speed={30} />
            </span>
            <br />
            <span className="text-xs sm:text-sm text-white font-semibold">
              <TypewriterText text="Será revelada pocas horas antes de iniciar la hackatón. ¡Sin trampas!" speed={20} delay={600} />
            </span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      tabTitle: "EL MENÚ",
      title: "Supervivencia, Catering y Caos",
      icon: <Utensils className="w-6 h-6 text-red-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
            Para hackear de noche se necesita combustible de primera. Aquí no te faltará absolutamente nada:
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-gray-300">
            <div className="bg-black/35 border border-gray-800 p-3 rounded flex flex-col gap-1 hover:border-gray-700 transition-colors">
              <span className="font-mono text-[9px] text-yellow-500/70">
                <TypewriterText text="const coffee_bar =" speed={20} />
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-yellow-500 shrink-0" />
                <TypewriterText text='"Café ilimitado"' speed={25} delay={400} />
              </span>
            </div>
            <div className="bg-black/35 border border-gray-800 p-3 rounded flex flex-col gap-1 hover:border-gray-700 transition-colors">
              <span className="font-mono text-[9px] text-red-500/70">
                <TypewriterText text="const beverages =" speed={20} />
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-500 shrink-0" />
                <TypewriterText text='"Cervezas heladas"' speed={25} delay={400} />
              </span>
            </div>
            <div className="bg-black/35 border border-gray-800 p-3 rounded flex flex-col gap-1 hover:border-gray-700 transition-colors">
              <span className="font-mono text-[9px] text-yellow-500/70">
                <TypewriterText text="const snacks =" speed={20} />
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-500 shrink-0" />
                <TypewriterText text='"Snacks buffer"' speed={25} delay={400} />
              </span>
            </div>
            <div className="bg-black/35 border border-gray-800 p-3 rounded flex flex-col gap-1 hover:border-gray-700 transition-colors">
              <span className="font-mono text-[9px] text-green-500/70">
                <TypewriterText text="const catering =" speed={20} />
              </span>
              <span className="text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-green-500 shrink-0" />
                <TypewriterText text='"Comida completa"' speed={25} delay={400} />
              </span>
            </div>
          </div>
          <p className="text-white font-black text-sm italic text-center leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            Y probablemente: fogatita, música, guitarra, caos y bugs a las 3 AM.
          </p>
          <div className="bg-gradient-to-r from-red-950/40 to-yellow-950/20 border border-yellow-800/40 p-3.5 rounded-lg flex items-center justify-between text-yellow-400 font-extrabold text-xs">
            <span className="font-mono">PD_RECOMENDADO:</span>
            <span>Lleven terno de baño... solo por si acaso</span>
          </div>
        </div>
      )
    }
  ];

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTabClick = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.2 }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start min-h-screen px-4 sm:px-6 py-12 md:py-16 relative w-full max-w-6xl mx-auto"
    >
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-b from-red-500 to-red-700 border-t-2 border-t-red-300 border-x border-x-red-600 border-b-4 border-b-red-900 rounded-xl text-white font-black shadow-[0_5px_15px_rgba(220,38,38,0.5)] hover:brightness-110 active:translate-y-1 active:border-b-0 active:mb-1 transition-all flex items-center gap-1 sm:gap-2 z-50 cursor-pointer text-xs sm:text-sm"
        >
          ← Volver
        </button>
      )}

      {/* Main Grid Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full mt-10 md:mt-6 items-stretch">
        
        {/* LEFT COLUMN: Event Brand, Prize & Permanent Date Info Card */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6 justify-between">
          
          {/* Logo & Main Title Banner */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3.5 px-1">
            <div className="relative shrink-0 flex items-center justify-center self-center md:self-start mb-2">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-red-600/20 blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img
                src="/images.png"
                alt="Krakedev Logo"
                className="relative h-28 sm:h-36 w-auto object-contain drop-shadow-[0_0_18px_rgba(220,38,38,0.8)]"
                animate={{
                  y: [0, -4, 0],
                  rotate: [-1.5, 1.5, -1.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            
            <div className="min-w-0">
              <div className="relative z-10 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.7)] flex items-center justify-center md:justify-start gap-2.5">
                <Trophy className="w-6 h-6 text-yellow-500 shrink-0" strokeWidth={2.5} />
                <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-red-500">
                  HACKATÓN KRAKE DEV
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-mono font-black leading-tight mt-2 uppercase">
                <span className="text-red-500">const</span> <span className="text-white">GRAND_PRIZE</span> <span className="text-gray-400">=</span>{" "}
                <br className="block md:hidden xl:block" />
                <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.85)] animate-pulse">1.894.737.48</span>{" "}
                <span className="text-xs sm:text-sm font-mono font-black text-yellow-500/80 uppercase tracking-widest">cop</span>
              </h2>
            </div>
          </div>

          {/* Permanent Date Card */}
          <div className="bg-gradient-to-br from-red-950/20 to-black/90 border border-red-900/30 p-5 rounded-2xl flex flex-col gap-4 shadow-xl text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
            <div className="border-b border-gray-800/80 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-white">LA CITA OFICIAL</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-black/45 border border-gray-800/60 p-4 rounded-xl flex flex-col gap-1 hover:border-red-900/40 hover:bg-black/60 transition-all">
                <span className="text-red-400 font-mono text-[10px] tracking-wider uppercase font-bold">
                  <TypewriterText text="let start_date =" speed={20} />
                </span>
                <span className="text-white font-mono font-bold text-sm sm:text-base bg-red-950/20 border border-red-900/20 px-2 py-1 rounded">
                  <TypewriterText text='"Viernes 22 Mayo — 18h00";' speed={25} delay={350} />
                </span>
              </div>
              <div className="bg-black/45 border border-gray-800/60 p-4 rounded-xl flex flex-col gap-1 hover:border-red-900/40 hover:bg-black/60 transition-all">
                <span className="text-red-400 font-mono text-[10px] tracking-wider uppercase font-bold">
                  <TypewriterText text="let end_date =" speed={20} />
                </span>
                <span className="text-white font-mono font-bold text-sm sm:text-base bg-red-950/20 border border-red-900/20 px-2 py-1 rounded">
                  <TypewriterText text='"Domingo 24 Mayo — 10h00";' speed={25} delay={350} />
                </span>
              </div>
            </div>
            
            <div className="bg-red-950/15 border border-red-900/30 p-3.5 rounded-xl flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-red-500 shrink-0" />
              <span className="text-[11px] sm:text-xs text-gray-300">
                📍 <strong className="text-white">Modalidad:</strong>{" "}
                <TypewriterText text="100% presencial en la sede Krakedev." speed={25} delay={100} />
              </span>
            </div>
            
            <span className="text-yellow-500 font-black text-xs text-center animate-pulse block pt-1">
              ¡El lunes es feriado! Tiempo oficial para recuperarse
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: SlideSelector Tabs, Content Slider, Arrow Nav, and CTA Button */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4 justify-between">
          
          {/* Main Slide Card Container */}
          <div className="flex flex-col items-stretch w-full">
            
            {/* Slide Selector Header Tabs */}
            <div className="flex flex-row flex-nowrap overflow-x-auto justify-between bg-black/40 border border-gray-800/80 rounded-xl p-1 mb-4 gap-1 no-scrollbar shadow-inner">
              {slides.map((sl, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={sl.id}
                    onClick={() => handleTabClick(idx)}
                    className={`relative flex-1 min-w-[80px] py-2 px-1 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer ${
                      isActive ? "text-white shadow-[0_0_10px_rgba(220,38,38,0.2)]" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-950 border border-red-500/50 rounded-lg -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{sl.tabTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Carousel Main Container Card */}
            <div className="relative min-h-[350px] bg-gradient-to-br from-red-950/15 to-black/95 border border-red-900/30 rounded-2xl p-5 sm:p-6 shadow-[0_0_24px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-600/70 to-transparent pointer-events-none" />
              
              <AnimatePresence initial={false} mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex-1 flex flex-col items-stretch text-left"
                >
                  {/* Card Title & Icon */}
                  <div className="flex items-center gap-3 border-b border-gray-800/80 pb-3 mb-4">
                    <div className="p-2 bg-red-950/40 border border-red-800/35 rounded-lg shrink-0">
                      {slides[currentSlide].icon}
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-black text-white uppercase tracking-wide">
                      {slides[currentSlide].title}
                    </h3>
                  </div>

                  {/* Card Body Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    {slides[currentSlide].content}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Arrow Navigation & Paging Dots */}
              <div className="flex flex-row items-center justify-between border-t border-gray-800/80 pt-4 mt-4">
                
                {/* Prev Button */}
                <button
                  onClick={handlePrevSlide}
                  className="p-2 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white hover:border-red-900/50 hover:bg-red-950/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                  aria-label="Diapositiva Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Pagination Indicators (Dots) */}
                <div className="flex items-center gap-2">
                  {slides.map((_, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTabClick(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isActive ? "bg-red-500 w-6 shadow-[0_0_8px_rgba(220,38,38,0.7)]" : "bg-gray-800 hover:bg-gray-600"
                        }`}
                        aria-label={`Ir a Diapositiva ${idx + 1}`}
                      />
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextSlide}
                  className="p-2 rounded-lg bg-gray-900/50 border border-gray-800 text-gray-400 hover:text-white hover:border-red-900/50 hover:bg-red-950/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                  aria-label="Diapositiva Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

              </div>
            </div>

          </div>

          {/* Form Submission Call-To-Action Button */}
          <div className="relative z-20 w-full flex flex-col items-center gap-2.5 mt-2">
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden w-full px-5 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-sm sm:text-base md:text-lg shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all border border-red-500/50 uppercase tracking-wider cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 drop-shadow-md">¡ME APUNTO AHORA MISMO!</span>
            </motion.button>
            <span className="text-gray-300 font-mono text-xs sm:text-sm tracking-wider text-center mt-1.5 font-bold block drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
              Evaluaciones: del 26 de mayo al 6 de junio. ¡Demuestra de qué estás hecho crack!
            </span>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
