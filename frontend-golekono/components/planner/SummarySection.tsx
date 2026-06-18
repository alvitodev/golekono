"use client";

import { motion } from "framer-motion";
import { Receipt, CalendarDays, RotateCcw, Sparkles } from "lucide-react";
import { formatRupiah } from "@/lib/formatters";
import Button from "@/components/ui/Button";
import type { SummarySectionProps } from "@/types";

export default function SummarySection({
  totalCost,
  totalDays,
  onReset,
}: SummarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-primary/20"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Info */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <span>Itinerary Anda Siap!</span>
            <Sparkles className="h-6 w-6 text-accent animate-pulse shrink-0" />
          </h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/70">Estimasi Total Tiket</p>
                <p className="text-lg font-bold">{formatRupiah(totalCost)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-white/70">Total Durasi</p>
                <p className="text-lg font-bold">{totalDays} Hari</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reset button */}
        <Button
          variant="outline"
          onClick={onReset}
          className="border-white/40 text-white hover:bg-white hover:text-primary shrink-0"
        >
          <RotateCcw className="h-4 w-4" />
          Rancang Ulang
        </Button>
      </div>
    </motion.div>
  );
}
