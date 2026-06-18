/**
 * Format a number as Indonesian Rupiah currency.
 * e.g., 50000 → "Rp 50.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Truncate text to a maximum length, appending "..." if truncated.
 */
export function truncateText(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Convert a category key to a human-readable label.
 * e.g., "Budaya_Dan_Sejarah" → "Budaya & Sejarah"
 */
export function formatCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    Alam: "Alam",
    Budaya_Dan_Sejarah: "Budaya & Sejarah",
    Edukasi: "Edukasi",
    Taman_Hiburan: "Taman Hiburan",
    Pusat_Perbelanjaan: "Pusat Perbelanjaan",
  };
  return map[category] || category.replace(/_/g, " ");
}
