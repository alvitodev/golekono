"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PreferenceForm from "@/components/planner/PreferenceForm";
import LoadingState from "@/components/planner/LoadingState";
import ResultView from "@/components/planner/ResultView";
import { generateItinerary } from "@/lib/api/mockItinerary";
import type { UserPreferences, ItineraryResponse } from "@/types";

type ViewState = "form" | "loading" | "result";

export default function PlannerView() {
  const [viewState, setViewState] = useState<ViewState>("form");
  const [preferences, setPreferences] = useState<UserPreferences>({
    minat: [],
    budget: 50000,
    durasi: 3,
    suasana: "",
  });
  const [itineraryResult, setItineraryResult] =
    useState<ItineraryResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setViewState("loading");
    setApiError(null);

    try {
      const result = await generateItinerary(preferences);
      setItineraryResult(result);
      setViewState("result");
    } catch (err: any) {
      setViewState("form");
      if (err.message && err.message.includes("429")) {
        setApiError(
          "Batas limit kueri terlampaui. Harap tunggu 1 menit sebelum mencoba lagi.",
        );
      } else if (err.message && err.message.includes("redirect")) {
        setApiError(
          "Redirect loop terdeteksi. Pastikan NEXT_PUBLIC_API_URL di Vercel adalah URL backend yang benar, lalu trigger redeploy.",
        );
      } else {
        setApiError(
          "Gagal menghubungi backend. Cek browser console untuk log endpoint URL. Pastikan backend aktif dan NEXT_PUBLIC_API_URL benar.",
        );
      }
    }
  };

  const handleReset = () => {
    setItineraryResult(null);
    setViewState("form");
    setApiError(null);
  };

  return (
    <section className="flex-1 pt-24 pb-16 relative overflow-hidden min-h-[70vh] flex flex-col justify-center">
      {/* Premium heritage background effects for visual richness */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Soft analogous gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          {viewState === "form" && (
            <PreferenceForm
              key="form"
              preferences={preferences}
              onPreferencesChange={setPreferences}
              onSubmit={handleSubmit}
              apiError={apiError}
            />
          )}

          {viewState === "loading" && <LoadingState key="loading" />}

          {viewState === "result" && itineraryResult && (
            <ResultView
              key="result"
              data={itineraryResult}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
