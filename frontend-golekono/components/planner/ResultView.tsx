"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SummarySection from "./SummarySection";
import DayTimeline from "./DayTimeline";
import DestinationCard from "./DestinationCard";
import type { ItineraryResponse } from "@/types";

interface ResultViewProps {
  data: ItineraryResponse;
  onReset: () => void;
}

export default function ResultView({ data, onReset }: ResultViewProps) {
  const days = Object.keys(data.itinerary);
  const [activeDay, setActiveDay] = useState(days[0] || "Hari 1");

  const currentDestinations = data.itinerary[activeDay] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Summary */}
      <SummarySection
        totalCost={data.estimasi_total_tiket}
        totalDays={days.length}
        onReset={onReset}
      />

      {/* Day Navigation */}
      <div className="space-y-6">
        <DayTimeline
          days={days}
          activeDay={activeDay}
          onSelect={setActiveDay}
        />

        {/* Destination Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {currentDestinations.map((dest, index) => (
              <motion.div
                key={dest.nama}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
