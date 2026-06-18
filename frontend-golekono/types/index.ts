// ─── Interest Categories ────────────────────────────
export type InterestCategory =
  | "Alam"
  | "Budaya_Dan_Sejarah"
  | "Edukasi"
  | "Taman_Hiburan"
  | "Pusat_Perbelanjaan";

// ─── Request Payload ────────────────────────────────
export interface UserPreferences {
  minat: InterestCategory[];
  budget: number;
  durasi: number;
  suasana?: string;
}

// ─── Response Payload ───────────────────────────────
export interface Destination {
  nama: string;
  type: InterestCategory;
  vote_average: number;
  htm_weekday: number;
  image: string;
  description: string;
  sentiment_label: string;
}

export interface ItineraryResponse {
  status: "success" | "error";
  estimasi_total_tiket: number;
  itinerary: Record<string, Destination[]>;
}

// ─── Component Props ────────────────────────────────
export interface DestinationCardProps {
  destination: Destination;
}

export interface DayTimelineProps {
  days: string[];
  activeDay: string;
  onSelect: (day: string) => void;
}

export interface SummarySectionProps {
  totalCost: number;
  totalDays: number;
  onReset: () => void;
}
