"use client";

import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-24 sm:py-32"
    >
      {/* Animated brain icon */}
      <div className="relative mb-8">
        {/* Outer pulse ring */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-24 h-24 rounded-full bg-primary/20"
        />
        {/* Middle pulse ring */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="absolute inset-0 w-24 h-24 rounded-full bg-primary/15"
        />
        {/* Icon container */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/30"
        >
          <BrainCircuit className="h-10 w-10 text-white" />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.h2
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="font-display text-xl sm:text-2xl font-bold text-charcoal text-center mb-3"
      >
        AI sedang bekerja...
      </motion.h2>

      <p className="text-sm text-slate-muted text-center max-w-md mb-8">
        Menganalisis sentimen ulasan pengunjung dan menyusun itinerary terbaik
        berdasarkan preferensi Anda.
      </p>

      {/* Progress steps */}
      <div className="space-y-3 w-full max-w-xs">
        {[
          "Menganalisis preferensi...",
          "Memproses ulasan dengan NLP...",
          "Mengoptimalkan rute perjalanan...",
        ].map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.6, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                backgroundColor: ["#C45C3C", "#E8785C", "#C45C3C"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0"
            />
            <span className="text-sm text-slate-muted">{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
