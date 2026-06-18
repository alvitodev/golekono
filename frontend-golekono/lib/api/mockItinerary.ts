import type { UserPreferences, ItineraryResponse } from "@/types";

/**
 * Fetch recommendation itinerary from Django ML backend via API proxy.
 * Makes a POST request to /api/itinerary which is rewritten to the Django backend.
 * Uses NEXT_PUBLIC_API_URL environment variable for production deployments.
 */
export async function generateItinerary(
  preferences: UserPreferences,
): Promise<ItineraryResponse> {
  try {
    console.log("Fetching itinerary from /api/itinerary");
    const response = await fetch("/api/itinerary", {
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
