import type { UserPreferences, ItineraryResponse } from "@/types";

/**
 * Fetch recommendation itinerary from Django ML backend.
 * Connects to http://localhost:8000/api/itinerary/.
 */
export async function generateItinerary(
  preferences: UserPreferences
): Promise<ItineraryResponse> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${backendUrl}/api/itinerary/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ItineraryResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Backend connection error. Check if Django is running:", error);
    throw error;
  }
}
