"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PlannerView from "@/components/planner/PlannerView";
import GuideView from "@/components/guide/GuideView";

type MainView = "home" | "planner" | "guide";

export default function HomePage() {
  const [currentView, setCurrentView] = useState<MainView>("home");

  // Read view state from URL query parameter on mount and when popstate occurs
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view");
      if (viewParam === "planner") {
        setCurrentView("planner");
      } else if (viewParam === "guide") {
        setCurrentView("guide");
      } else {
        setCurrentView("home");
      }
    };

    // Run on mount
    handleUrlChange();

    // Listen to browser navigation (back/forward buttons)
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  return (
    <>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 flex flex-col">
        {currentView === "home" && (
          <>
            <HeroSection setCurrentView={setCurrentView} />
            <FeaturesSection />
          </>
        )}
        {currentView === "planner" && <PlannerView />}
        {currentView === "guide" && <GuideView />}
      </main>
      <Footer currentView={currentView} setCurrentView={setCurrentView} />
    </>
  );
}
