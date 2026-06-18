import type { UserPreferences, ItineraryResponse } from "@/types";

export type LoadingPhase =
  | "pending"             // Phase 1: health check pending
  | "cold_start"          // Phase 1 (slow): Cold Start detected (ping > 2s)
  | "loading_model"       // Phase 2: health check succeeded, loading keras model
  | "nlp_analysis"        // Phase 3: Wait 2s -> Menganalisis Sentimen Suasana (NLP)
  | "cosine_similarity"   // Phase 4: Wait 2s -> Menghitung Matriks Cosine Similarity
  | "building_itinerary"; // Phase 5: Wait 1.5s -> Menyusun Rantai Itinerary

type PhaseListener = (phase: LoadingPhase) => void;
const listeners = new Set<PhaseListener>();

/**
 * Subscribe to ML backend phase updates.
 */
export function subscribeToLoadingPhase(listener: PhaseListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyPhase(phase: LoadingPhase) {
  listeners.forEach((listener) => listener(phase));
}

/**
 * Fetch recommendation itinerary from Django ML backend.
 * Uses NEXT_PUBLIC_API_URL environment variable for backend URL if set.
 * Otherwise, routes requests locally through Next.js rewrites to Hugging Face Spaces.
 */
export async function generateItinerary(
  preferences: UserPreferences,
): Promise<ItineraryResponse> {
  try {
    notifyPhase("pending");

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
    // Note: Backend endpoints should have trailing slashes
    const healthEndpoint = `${backendUrl}/api/health/`;
    const itineraryEndpoint = `${backendUrl}/api/itinerary/`;

    console.log("Health check endpoint:", healthEndpoint);
    console.log("Itinerary endpoint:", itineraryEndpoint);

    // 1. Ping health check to identify cold start
    const startTime = Date.now();
    let isColdStart = false;

    // Helper timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 2000)
    );

    try {
      const healthPromise = fetch(healthEndpoint, { method: "GET" });

      // Race health check against 2-second timeout
      await Promise.race([healthPromise, timeoutPromise]).catch((error) => {
        if (error.message === "timeout") {
          isColdStart = true;
          notifyPhase("cold_start");
        } else {
          throw error;
        }
      });

      // Wait for health check to actually finish (if it timed out)
      const healthResponse = await healthPromise;
      if (!healthResponse.ok) {
        console.warn("Health check response not OK, continuing anyway");
      }
    } catch (e) {
      console.error("Health check error, continuing to request itinerary anyway:", e);
    }

    // 2. Phase 2: After health check succeeds -> loading model
    notifyPhase("loading_model");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. Phase 3: NLP Sentiment Analysis
    notifyPhase("nlp_analysis");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 4. Phase 4: Cosine Similarity calculation
    notifyPhase("cosine_similarity");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 5. Phase 5: Building itinerary chain
    notifyPhase("building_itinerary");

    console.log("Fetching itinerary from:", itineraryEndpoint);
    const response = await fetch(itineraryEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    const data: ItineraryResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to generate itinerary:", error);
    throw error;
  }
}
