"use client";

import { motion } from "framer-motion";
import { INTEREST_OPTIONS } from "@/lib/constants";
import type { InterestCategory } from "@/types";

interface InterestPillsProps {
  selected: InterestCategory[];
  onChange: (selected: InterestCategory[]) => void;
}

export default function InterestPills({
  selected,
  onChange,
}: InterestPillsProps) {
  const toggle = (value: InterestCategory) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-charcoal">
        Minat Wisata
        <span className="ml-1 text-xs font-normal text-slate-muted">
          (Pilih satu atau lebih)
        </span>
      </label>
      <div className="flex flex-wrap gap-2.5">
        {INTEREST_OPTIONS.map((option) => {
          const isActive = selected.includes(option.value);
          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              whileTap={{ scale: 0.95 }}
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                border-2 transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-white text-charcoal border-stone hover:border-primary/40 hover:bg-stone"
                }
              `}
            >
              <span className="text-base">{option.emoji}</span>
              <span>{option.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
