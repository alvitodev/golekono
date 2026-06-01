"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PreferenceForm from "@/components/planner/PreferenceForm";
import LoadingState from "@/components/planner/LoadingState";
import ResultView from "@/components/planner/ResultView";
import { generateItinerary } from "@/lib/api/mockItinerary";
import type { UserPreferences, ItineraryResponse } from "@/types";

type ViewState = "form" | "loading" | "result";

export default function PlannerPage() {
  const [viewState, setViewState] = useState<ViewState>("form");
  const [preferences, setPreferences] = useState<UserPreferences>({
    minat: [],
    budget: 50000,
    durasi: 3,
    suasana: "",
  });
  const [itineraryResult, setItineraryResult] =
    useState<ItineraryResponse | null>(null);

  const handleSubmit = async () => {
    setViewState("loading");

    try {
      const result = await generateItinerary(preferences);
      setItineraryResult(result);
      setViewState("result");
    } catch {
      // Handle error — for now, go back to form
      setViewState("form");
    }
  };

  const handleReset = () => {
    setItineraryResult(null);
    setViewState("form");
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {viewState === "form" && (
              <PreferenceForm
                key="form"
                preferences={preferences}
                onPreferencesChange={setPreferences}
                onSubmit={handleSubmit}
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
      </main>
      <Footer />
    </>
  );
}
