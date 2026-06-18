"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({
  icon: Icon,
  step,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-stone transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Step number */}
        <div className="absolute -top-4 -left-2 w-10 h-10 bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-200">
          {step}
        </div>

        {/* Icon */}
        <div className="w-14 h-14 bg-sand rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-200">
          <Icon className="h-7 w-7 text-primary" />
        </div>

        {/* Content */}
        <h3 className="font-display text-lg font-bold text-charcoal mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-muted leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
