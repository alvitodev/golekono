"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertTriangle, X } from "lucide-react";
import InterestPills from "./InterestPills";
import SuasanaInput from "./SuasanaInput";
import BudgetSlider from "./BudgetSlider";
import DurationStepper from "./DurationStepper";
import Button from "@/components/ui/Button";
import type { UserPreferences, InterestCategory } from "@/types";

/**
 * Checks if a string is random keyboard smashing / gibberish.
 */
function isGibberish(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0) return false;

  // 1. Detect standard horizontal/vertical row key smashing
  const smashPatterns = [
    /asdf/i, /sdfg/i, /dfgh/i, /fghj/i, /ghjk/i, /hjkl/i,
    /qwer/i, /wert/i, /erty/i, /rtyu/i, /tyui/i, /yuio/i, /uiop/i,
    /zxcv/i, /xcvb/i, /cvbn/i, /vbnm/i,
    /qweqwe/i, /asdasd/i, /zxzx/i,
  ];
  if (smashPatterns.some(pattern => pattern.test(trimmed))) {
    return true;
  }

  const words = trimmed.toLowerCase().split(/\s+/);
  for (const word of words) {
    if (word.length <= 4) continue;

    // 2. Count vowels
    const vowelCount = (word.match(/[aeiou]/g) || []).length;
    
    // 3. Vowel ratio threshold check
    // legitimate Indonesian words have typical vowel ratios of 30-45%.
    // Key mashing has a much lower vowel count.
    if (word.length >= 8 && vowelCount / word.length < 0.33) {
      return true;
    }

    // 4. Consonant cluster check: 4 or more consecutive consonants in a row
    // (ignores standard digraphs: ng, ny, sy, kh)
    const simplified = word
      .replace(/ng/g, "x")
      .replace(/ny/g, "x")
      .replace(/sy/g, "x")
      .replace(/kh/g, "x");
      
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/.test(simplified)) {
      return true;
    }

    // 5. Repeated character sequence check (e.g. "aaaaa", "zzzzz")
    if (/(.)\1{3,}/.test(word)) {
      return true;
    }

    // 6. Repeated 2-character patterns (e.g. "fafafa", "kekeke", "sksksk")
    if (/(..)\1{2,}/.test(word)) {
      return true;
    }

    // 7. Repeated 3-character patterns (e.g. "qweqwe", "asdasd", "xyzxyz")
    if (/(...)\1{1,}/.test(word)) {
      return true;
    }

    // 8. Very long words with zero vowels
    if (word.length >= 5 && vowelCount === 0) {
      return true;
    }
  }

  return false;
}

interface PreferenceFormProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
  onSubmit: () => void;
  apiError?: string | null;
}

export default function PreferenceForm({
  preferences,
  onPreferencesChange,
  onSubmit,
  apiError,
}: PreferenceFormProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [missingItems, setMissingItems] = useState<string[]>([]);

  const updateField = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    onPreferencesChange({ ...preferences, [key]: value });
  };

  const trimmedSuasana = preferences.suasana ? preferences.suasana.trim() : "";
  const isSuasanaTooShort = trimmedSuasana.length > 0 && trimmedSuasana.length < 4;
  const isSuasanaGibberish = trimmedSuasana ? isGibberish(trimmedSuasana) : false;
  const isValid = preferences.minat.length > 0 && preferences.budget > 0 && !isSuasanaGibberish && !isSuasanaTooShort;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit();
    } else {
      triggerWarning();
    }
  };

  const triggerWarning = () => {
    const missing: string[] = [];
    if (preferences.minat.length === 0) {
      missing.push("Pilih minimal 1 Kategori Minat Wisata (misal: Alam atau Budaya).");
    }
    if (preferences.budget === 0) {
      missing.push("Atur Budget Maksimal per Tempat lebih dari Rp 0.");
    }
    if (isSuasanaTooShort) {
      missing.push("Masukkan kalimat preferensi suasana yang lebih panjang (minimal 4 karakter).");
    } else if (isSuasanaGibberish) {
      missing.push("Masukkan kalimat preferensi suasana yang benar (bukan acak/keyboard smash).");
    }
    setMissingItems(missing);
    setShowWarning(true);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (!isValid) {
      e.preventDefault();
      triggerWarning();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal tracking-tight">
            Rancang Itinerary Anda
          </h1>
          <p className="mt-3 text-slate-muted max-w-lg mx-auto">
            Isi preferensi wisata Anda dan biarkan AI menyusun rencana perjalanan
            terbaik berdasarkan analisis sentimen ulasan pengunjung.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit}>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm font-semibold shadow-sm"
            >
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
              <span>{apiError}</span>
            </motion.div>
          )}

          <div className="bg-white rounded-2xl border border-stone shadow-sm p-6 sm:p-8 space-y-8">
            <InterestPills
              selected={preferences.minat}
              onChange={(selected: InterestCategory[]) => updateField("minat", selected)}
            />

            <div className="h-px bg-stone" />

            <SuasanaInput
              value={preferences.suasana || ""}
              onChange={(value: string) => updateField("suasana", value)}
              error={
                isSuasanaTooShort
                  ? "Kalimat preferensi terlalu pendek (minimal 4 karakter)"
                  : isSuasanaGibberish
                  ? "Masukkan kalimat preferensi suasana hati yang benar (hindari ketikan acak/keyboard smashing)"
                  : null
              }
            />

            <div className="h-px bg-stone" />

            <BudgetSlider
              value={preferences.budget}
              onChange={(value: number) => updateField("budget", value)}
            />

            <div className="h-px bg-stone" />

            <DurationStepper
              value={preferences.durasi}
              onChange={(value: number) => updateField("durasi", value)}
            />
          </div>

          {/* Submit button */}
          <div className="mt-8 text-center">
            <Button
              type="submit"
              size="lg"
              variant={isValid ? "primary" : "none"}
              onClick={handleButtonClick}
              className={`w-full sm:w-auto transition-all duration-300 ${
                !isValid
                  ? "bg-primary/10 hover:bg-primary/10 text-primary/70 border border-primary/20 cursor-not-allowed shadow-none opacity-85"
                  : ""
              }`}
            >
              <Sparkles className="h-5 w-5 animate-pulse" />
              Generate Itinerary dengan AI
            </Button>
            {!isValid && (
              <p className="mt-3 text-xs text-slate-muted">
                Pilih minimal 1 minat wisata dan atur budget untuk melanjutkan.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Modern Warning Alert Dialog Modal */}
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Smooth Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWarning(false)}
              className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            />
            
            {/* Modal Card Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative bg-white w-full max-w-md rounded-2xl border border-stone shadow-2xl p-6 overflow-hidden z-10"
            >
              {/* Close Button Icon */}
              <button
                onClick={() => setShowWarning(false)}
                className="absolute top-4 right-4 text-slate-muted hover:text-charcoal transition-colors cursor-pointer"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 border border-amber-200 text-amber-600 shadow-sm">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-display text-lg font-bold text-charcoal">
                    Form Belum Lengkap
                  </h3>
                  <p className="text-sm text-slate-muted leading-relaxed">
                    AI membutuhkan preferensi lengkap untuk merancang liburan terbaik di Yogyakarta. Harap sesuaikan:
                  </p>
                  <ul className="text-sm space-y-2 pl-1 pt-1.5">
                    {missingItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-amber-800 font-medium">
                        <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowWarning(false)}
                  className="px-5 py-2.5 rounded-xl bg-charcoal text-white hover:bg-charcoal/90 text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Saya Mengerti
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
