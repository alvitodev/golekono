"use client";

import { MessageSquareText, AlertTriangle } from "lucide-react";

interface SuasanaInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
}

export default function SuasanaInput({
  value,
  onChange,
  error,
}: SuasanaInputProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor="suasana"
        className="flex items-center gap-2 text-sm font-semibold text-charcoal"
      >
        <MessageSquareText className="h-4 w-4 text-primary" />
        Preferensi Suasana
        <span className="text-xs font-normal text-slate-muted">(Opsional)</span>
      </label>
      <textarea
        id="suasana"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Contoh: Saya ingin tempat yang tenang, sejuk, dan tidak terlalu ramai..."
        rows={3}
        className={`w-full px-4 py-3 text-sm text-charcoal bg-white border-2 rounded-xl resize-none
          placeholder:text-slate-muted/60 focus:ring-2 focus:outline-none transition-all duration-200
          ${
            error
              ? "border-primary-light focus:border-primary-light focus:ring-primary/10"
              : "border-stone focus:border-primary focus:ring-primary/10"
          }`}
      />
      {error ? (
        <p className="text-xs text-primary-dark font-semibold flex items-center gap-1.5 animate-pulse">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-xs text-slate-muted">
          AI akan menganalisis preferensi suasana Anda menggunakan NLP untuk
          mencocokkan dengan sentimen ulasan pengunjung.
        </p>
      )}
    </div>
  );
}
