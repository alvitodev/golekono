import type { UserPreferences, ItineraryResponse } from "@/types";

/**
 * Fetch recommendation itinerary from Django ML backend via API proxy.
 * Makes a POST request to /api/generate which is rewritten to the Django backend.
 */
export async function generateItinerary(
  preferences: UserPreferences,
): Promise<ItineraryResponse> {
  try {
    console.log("Fetching itinerary from /api/generate");
    const response = await fetch("/api/generate", {
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
