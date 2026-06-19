"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  setCurrentView?: (view: "home" | "planner" | "guide") => void;
}

export default function HeroSection({ setCurrentView }: HeroSectionProps) {
  const handleStartPlanning = (e: React.MouseEvent) => {
    if (setCurrentView) {
      e.preventDefault();
      setCurrentView("planner");
      window.scrollTo({ top: 0, behavior: "smooth" });
      const newUrl = "/?view=planner";
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-36">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 backdrop-blur-sm border border-stone rounded-full text-sm font-medium text-charcoal shadow-sm"
        >
          <Sparkles className="h-4 w-4 text-accent-dark" />
          <span>Powered by AI & Sentiment Analysis</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-charcoal leading-[1.1]"
        >
          Rencanakan Wisata{" "}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Yogyakarta
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-dark rounded-full origin-left"
            />
          </span>{" "}
          dengan AI
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 text-lg sm:text-xl text-slate-muted max-w-2xl mx-auto leading-relaxed"
        >
          GolekOno menganalisis ribuan ulasan pengunjung menggunakan{" "}
          <span className="font-semibold text-charcoal">NLP & Sentiment Analysis</span>{" "}
          untuk menyusun itinerary terbaik sesuai selera dan budget Anda.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/planner" size="lg" onClick={handleStartPlanning}>
            Mulai Rancang Itinerary
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button href="#how-it-works" variant="ghost" size="lg">
            Lihat Cara Kerja
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          {[
            { value: "50+", label: "Destinasi" },
            { value: "10K+", label: "Ulasan Dianalisis" },
            { value: "AI", label: "Powered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-muted mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand to-transparent pointer-events-none" />
    </section>
  );
}
