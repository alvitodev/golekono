import type { InterestCategory } from "@/types";

export const INTEREST_OPTIONS: {
  value: InterestCategory;
  label: string;
  emoji: string;
}[] = [
  { value: "Alam", label: "Alam", emoji: "🌿" },
  { value: "Budaya_Dan_Sejarah", label: "Budaya & Sejarah", emoji: "🏛️" },
  { value: "Edukasi", label: "Edukasi", emoji: "📚" },
  { value: "Taman_Hiburan", label: "Taman Hiburan", emoji: "🎢" },
  { value: "Pusat_Perbelanjaan", label: "Pusat Perbelanjaan", emoji: "🛍️" },
];

export const BUDGET_MIN = 0;
export const BUDGET_MAX = 100000;
export const BUDGET_STEP = 5000;

export const DURATION_MIN = 1;
export const DURATION_MAX = 7;

export const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Alam: { bg: "bg-emerald-100", text: "text-emerald-700" },
  Budaya_Dan_Sejarah: { bg: "bg-amber-100", text: "text-amber-700" },
  Edukasi: { bg: "bg-blue-100", text: "text-blue-700" },
  Taman_Hiburan: { bg: "bg-purple-100", text: "text-purple-700" },
  Pusat_Perbelanjaan: { bg: "bg-pink-100", text: "text-pink-700" },
};

export const SENTIMENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Positif: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  Negatif: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  Netral: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
  },
};
