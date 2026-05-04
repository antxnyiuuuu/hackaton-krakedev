"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChallengeView } from "./components/ChallengeView";
import { PoliciesView } from "./components/PoliciesView";
import { PrizeView } from "./components/PrizeView";
import { RegistrationForm } from "./components/RegistrationForm";

export default function Home() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <main className="relative min-h-screen bg-black flex flex-col selection:bg-red-500 selection:text-white">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[150%] h-[150%] md:w-[40%] md:h-[40%] bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.3)_0%,transparent_60%)] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[150%] h-[150%] md:w-[30%] md:h-[30%] bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.2)_0%,transparent_60%)] rounded-full mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 && <ChallengeView key="challenge" onNext={nextStep} />}
          {step === 1 && <PoliciesView key="policies" onNext={nextStep} onBack={prevStep} />}
          {step === 2 && <PrizeView key="prize" onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <RegistrationForm key="form" onBack={prevStep} />}
        </AnimatePresence>
      </div>
    </main>
  );
}
