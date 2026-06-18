import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="inline-flex items-center gap-1">
      <Star className="h-4 w-4 text-accent-dark fill-accent" />
      <span className="text-sm font-semibold text-charcoal">{rating.toFixed(1)}</span>
    </div>
  );
}
