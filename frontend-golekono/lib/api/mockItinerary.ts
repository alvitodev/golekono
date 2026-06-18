import type { UserPreferences, ItineraryResponse } from "@/types";

/**
 * Fetch recommendation itinerary from Django ML backend.
 * Uses NEXT_PUBLIC_API_URL environment variable for backend URL (set during build in Vercel).
 * Defaults to localhost:8000 for local development.
 */
export async function generateItinerary(
  preferences: UserPreferences,
): Promise<ItineraryResponse> {
  try {
    // Get backend URL from environment variable (set at build time or defaults to localhost)
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    // Note: Backend endpoint requires trailing slash (/api/itinerary/)
    // Without it, Django redirects with GET method instead of POST
    const apiEndpoint = `${backendUrl}/api/itinerary/`;

    console.log("Fetching itinerary from:", apiEndpoint);
    console.log("Backend URL:", backendUrl);

    const response = await fetch(apiEndpoint, {
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
