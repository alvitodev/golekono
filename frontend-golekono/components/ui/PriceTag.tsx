import { Banknote } from "lucide-react";
import { formatRupiah } from "@/lib/formatters";

interface PriceTagProps {
  amount: number;
}

export default function PriceTag({ amount }: PriceTagProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <Banknote className="h-4 w-4 text-secondary" />
      <span className="text-sm font-semibold text-secondary">
        {formatRupiah(amount)}
      </span>
    </div>
  );
}
