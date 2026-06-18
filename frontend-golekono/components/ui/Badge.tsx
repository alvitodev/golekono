import { BADGE_COLORS } from "@/lib/constants";
import { formatCategoryLabel } from "@/lib/formatters";

interface BadgeProps {
  label: string;
  variant?: "category" | "custom";
  className?: string;
}

export default function Badge({
  label,
  variant = "category",
  className = "",
}: BadgeProps) {
  const colors =
    variant === "category" && BADGE_COLORS[label]
      ? BADGE_COLORS[label]
      : { bg: "bg-gray-100", text: "text-gray-700" };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} ${className}`}
    >
      {variant === "category" ? formatCategoryLabel(label) : label}
    </span>
  );
}
