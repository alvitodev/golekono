"use client";

import { motion } from "framer-motion";
import type { DayTimelineProps } from "@/types";

export default function DayTimeline({
  days,
  activeDay,
  onSelect,
}: DayTimelineProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {days.map((day) => {
        const isActive = day === activeDay;
        return (
          <button
            key={day}
            onClick={() => onSelect(day)}
            className={`
              relative px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap
              transition-colors duration-200 cursor-pointer
              ${
                isActive
                  ? "text-white"
                  : "text-slate-muted bg-white border border-stone hover:bg-stone hover:text-charcoal"
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeDay"
                className="absolute inset-0 bg-primary rounded-xl shadow-md shadow-primary/25"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{day}</span>
          </button>
        );
      })}
    </div>
  );
}
