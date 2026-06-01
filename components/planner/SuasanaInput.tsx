"use client";

import { MessageSquareText } from "lucide-react";

interface SuasanaInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SuasanaInput({ value, onChange }: SuasanaInputProps) {
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
        className="w-full px-4 py-3 text-sm text-charcoal bg-white border-2 border-stone rounded-xl resize-none
          placeholder:text-slate-muted/60
          focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none
          transition-all duration-200"
      />
      <p className="text-xs text-slate-muted">
        AI akan menganalisis preferensi suasana Anda menggunakan NLP untuk
        mencocokkan dengan sentimen ulasan pengunjung.
      </p>
    </div>
  );
}
