"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import InterestPills from "./InterestPills";
import SuasanaInput from "./SuasanaInput";
import BudgetSlider from "./BudgetSlider";
import DurationStepper from "./DurationStepper";
import Button from "@/components/ui/Button";
import type { UserPreferences, InterestCategory } from "@/types";

interface PreferenceFormProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
  onSubmit: () => void;
}

export default function PreferenceForm({
  preferences,
  onPreferencesChange,
  onSubmit,
}: PreferenceFormProps) {
  const updateField = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    onPreferencesChange({ ...preferences, [key]: value });
  };

  const isValid = preferences.minat.length > 0 && preferences.budget > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit();
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
          <div className="bg-white rounded-2xl border border-stone shadow-sm p-6 sm:p-8 space-y-8">
            <InterestPills
              selected={preferences.minat}
              onChange={(selected: InterestCategory[]) => updateField("minat", selected)}
            />

            <div className="h-px bg-stone" />

            <SuasanaInput
              value={preferences.suasana || ""}
              onChange={(value: string) => updateField("suasana", value)}
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
              disabled={!isValid}
              className="w-full sm:w-auto"
            >
              <Sparkles className="h-5 w-5" />
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
    </motion.div>
  );
}
