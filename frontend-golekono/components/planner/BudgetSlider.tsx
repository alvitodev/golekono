"use client";

import { Wallet } from "lucide-react";
import { formatRupiah } from "@/lib/formatters";
import { BUDGET_MIN, BUDGET_MAX, BUDGET_STEP } from "@/lib/constants";

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="budget"
          className="flex items-center gap-2 text-sm font-semibold text-charcoal"
        >
          <Wallet className="h-4 w-4 text-primary" />
          Budget Maksimal per Tempat
        </label>
        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
          {formatRupiah(value)}
        </span>
      </div>
      <input
        id="budget"
        type="range"
        min={BUDGET_MIN}
        max={BUDGET_MAX}
        step={BUDGET_STEP}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />
      <div className="flex justify-between text-xs text-slate-muted">
        <span>{formatRupiah(BUDGET_MIN)}</span>
        <span>{formatRupiah(BUDGET_MAX)}</span>
      </div>
    </div>
  );
}
