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
  Alam: { bg: "bg-emerald-100 dark:bg-emerald-900/40", text: "text-emerald-700 dark:text-emerald-300" },
  Budaya_Dan_Sejarah: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300" },
  Edukasi: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300" },
  Taman_Hiburan: { bg: "bg-purple-100 dark:bg-purple-900/40", text: "text-purple-700 dark:text-purple-300" },
  Pusat_Perbelanjaan: { bg: "bg-pink-100 dark:bg-pink-900/40", text: "text-pink-700 dark:text-pink-300" },
};

export const SENTIMENT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Positif: {
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-700",
  },
  Negatif: {
    bg: "bg-red-50 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-700",
  },
  Netral: {
    bg: "bg-gray-50 dark:bg-gray-800/30",
    text: "text-gray-600 dark:text-gray-300",
    border: "border-gray-200 dark:border-gray-600",
  },
};
