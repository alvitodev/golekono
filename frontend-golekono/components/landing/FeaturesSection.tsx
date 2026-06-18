"use client";

import { motion } from "framer-motion";
import { ClipboardList, BrainCircuit, MapPinned } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: ClipboardList,
    step: 1,
    title: "Input Preferensi",
    description:
      "Pilih minat wisata, atur budget, durasi perjalanan, dan deskripsikan suasana yang Anda inginkan.",
  },
  {
    icon: BrainCircuit,
    step: 2,
    title: "AI Analisis Sentimen & Jarak",
    description:
      "AI menganalisis ribuan ulasan pengunjung menggunakan NLP untuk memahami kualitas setiap destinasi.",
  },
  {
    icon: MapPinned,
    step: 3,
    title: "Itinerary Siap!",
    description:
      "Dapatkan rencana perjalanan optimal yang dipersonalisasi, lengkap dengan estimasi biaya dan sentimen.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-stone to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Cara Kerja
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            3 Langkah Mudah Menuju Liburan Impian
          </h2>
          <p className="mt-4 text-slate-muted max-w-xl mx-auto">
            Biarkan AI yang bekerja untuk Anda. Cukup masukkan preferensi dan
            dapatkan itinerary yang telah dioptimalkan.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.step}
              {...feature}
              delay={index * 0.15}
            />
          ))}
        </div>

        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-[60%] left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-0" />
      </div>
    </section>
  );
}
