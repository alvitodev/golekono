import type { UserPreferences, ItineraryResponse } from "@/types";
import { MOCK_ITINERARY } from "@/lib/mockData";

/**
 * Mock API function that simulates a POST request to the backend.
 * Simulates a 2-second network delay, then returns mock itinerary data
 * sliced according to the user's requested duration (durasi).
 *
 * When the backend is ready, replace the body of this function
 * with a real fetch() call. Zero component changes required.
 */
export async function generateItinerary(
  preferences: UserPreferences
): Promise<ItineraryResponse> {
  // Simulate network / AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Get all days from the mock data
  const allDays = Object.entries(MOCK_ITINERARY.itinerary);

  // Slice to match the requested duration
  const slicedDays = allDays.slice(0, preferences.durasi);

  // Build the sliced itinerary
  const slicedItinerary: Record<string, typeof MOCK_ITINERARY.itinerary[string]> = {};
  let totalCost = 0;

  for (const [day, destinations] of slicedDays) {
    // Filter destinations by budget
    const filtered = destinations.filter(
      (d) => d.htm_weekday <= preferences.budget
    );
    slicedItinerary[day] = filtered.length > 0 ? filtered : destinations;

    // Sum up costs
    for (const dest of slicedItinerary[day]) {
      totalCost += dest.htm_weekday;
    }
  }

  return {
    status: "success",
    estimasi_total_tiket: totalCost,
    itinerary: slicedItinerary,
  };
}
