"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Minus, Plus } from "lucide-react";
import { DURATION_MIN, DURATION_MAX } from "@/lib/constants";

interface DurationStepperProps {
  value: number;
  onChange: (value: number) => void;
}

export default function DurationStepper({
  value,
  onChange,
}: DurationStepperProps) {
  const decrement = () => {
    if (value > DURATION_MIN) onChange(value - 1);
  };

  const increment = () => {
    if (value < DURATION_MAX) onChange(value + 1);
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-semibold text-charcoal">
        <CalendarDays className="h-4 w-4 text-primary" />
        Durasi Perjalanan
      </label>
      <div className="flex items-center gap-4">
        {/* Decrement button */}
        <button
          type="button"
          onClick={decrement}
          disabled={value <= DURATION_MIN}
          className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-stone bg-white text-charcoal
            hover:border-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 cursor-pointer"
        >
          <Minus className="h-4 w-4" />
        </button>

        {/* Value display */}
        <div className="flex-1 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="flex items-baseline justify-center gap-1.5"
            >
              <span className="font-display text-4xl font-bold text-primary">
                {value}
              </span>
              <span className="text-sm text-slate-muted">
                {value === 1 ? "hari" : "hari"}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Increment button */}
        <button
          type="button"
          onClick={increment}
          disabled={value >= DURATION_MAX}
          className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-stone bg-white text-charcoal
            hover:border-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-center text-slate-muted">
        Minimum {DURATION_MIN} hari, maksimum {DURATION_MAX} hari
      </p>
    </div>
  );
}
