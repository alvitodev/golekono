"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Check, Loader2 } from "lucide-react";
import { subscribeToLoadingPhase, type LoadingPhase } from "@/lib/api/mockItinerary";

export default function LoadingState() {
  const [phase, setPhase] = useState<LoadingPhase>("pending");

  useEffect(() => {
    // Subscribe to backend phase updates broadcast by mockItinerary.ts
    const unsubscribe = subscribeToLoadingPhase((newPhase) => {
      setPhase(newPhase);
    });
    return unsubscribe;
  }, []);

  // Map phase status to step indexes
  const getStepStatus = (stepIndex: number) => {
    const phaseWeights: Record<LoadingPhase, number> = {
      pending: 0,
      cold_start: 0,
      loading_model: 1,
      nlp_analysis: 2,
      cosine_similarity: 3,
      building_itinerary: 4,
    };

    const currentWeight = phaseWeights[phase];
    if (currentWeight > stepIndex) return "completed";
    if (currentWeight === stepIndex) return "active";
    return "pending";
  };

  const steps = [
    {
      label:
        phase === "cold_start"
          ? "Menghidupkan Server AI di Hugging Face (Cold Start)..."
          : "Menghubungi Server AI...",
      index: 0,
    },
    {
      label: "Memuat Keras Neural Network...",
      index: 1,
    },
    {
      label: "Menganalisis Sentimen Suasana (NLP)...",
      index: 2,
    },
    {
      label: "Menghitung Matriks Cosine Similarity...",
      index: 3,
    },
    {
      label: "Menyusun Rantai Itinerary...",
      index: 4,
    },
  ];

  // Helper to get active step's description
  const getActivePhaseHeading = () => {
    switch (phase) {
      case "cold_start":
        return "Server Sedang Dingin...";
      case "loading_model":
        return "Menyiapkan AI Model...";
      case "nlp_analysis":
        return "Menganalisis Suasana...";
      case "cosine_similarity":
        return "Mencari Kecocokan Wisata...";
      case "building_itinerary":
        return "Menyusun Jadwal Perjalanan...";
      default:
        return "Menghubungi Backend AI...";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 sm:py-28"
    >
      {/* Animated Brain Icon */}
      <div className="relative mb-8">
        {/* Outer pulse ring */}
        <motion.div
          animate={{
            scale: phase === "cold_start" ? [1, 1.5, 1] : [1, 1.3, 1],
            opacity: phase === "cold_start" ? [0.4, 0, 0.4] : [0.25, 0, 0.25],
          }}
          transition={{
            duration: phase === "cold_start" ? 1.5 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-24 h-24 rounded-full bg-primary/20"
        />
        {/* Middle pulse ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="absolute inset-0 w-24 h-24 rounded-full bg-primary/15"
        />
        {/* Icon Container */}
        <motion.div
          animate={{
            rotate: phase === "cold_start" ? [0, 360] : [0, 5, -5, 0],
          }}
          transition={{
            duration: phase === "cold_start" ? 8 : 4,
            repeat: Infinity,
            ease: phase === "cold_start" ? "linear" : "easeInOut",
          }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/30"
        >
          {phase === "cold_start" ? (
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          ) : (
            <BrainCircuit className="h-10 w-10 text-white" />
          )}
        </motion.div>
      </div>

      {/* Dynamic Header */}
      <div className="h-16 flex items-center justify-center mb-2">
        <AnimatePresence mode="wait">
          <motion.h2
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="font-display text-xl sm:text-2xl font-bold text-charcoal text-center"
          >
            {getActivePhaseHeading()}
          </motion.h2>
        </AnimatePresence>
      </div>

      <p className="text-sm text-slate-muted text-center max-w-md mb-10 px-4">
        {phase === "cold_start"
          ? "Server Hugging Face sedang bangun dari masa tidur (Cold Start). Ini membutuhkan waktu sekitar 10-30 detik."
          : "Mohon tunggu sejenak sementara kecerdasan buatan kami menganalisis ulasan wisata dan membuat itinerary ideal untuk Anda."}
      </p>

      {/* Real-time Progress Pipeline */}
      <div className="space-y-4 w-full max-w-sm px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
        {steps.map((step) => {
          const status = getStepStatus(step.index);
          return (
            <div
              key={step.index}
              className={`flex items-center gap-4 transition-all duration-300 ${
                status === "pending" ? "opacity-45" : "opacity-100"
              }`}
            >
              {/* Step indicator */}
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full relative">
                {status === "completed" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                  >
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </motion.div>
                )}
                {status === "active" && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary/30"
                    />
                    <div className="w-3.5 h-3.5 rounded-full bg-primary relative z-10" />
                  </>
                )}
                {status === "pending" && (
                  <div className="w-3 h-3 rounded-full bg-slate-300" />
                )}
              </div>

              {/* Step label */}
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  status === "completed"
                    ? "text-slate-muted line-through decoration-slate-300"
                    : status === "active"
                    ? "text-charcoal font-semibold"
                    : "text-slate-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
