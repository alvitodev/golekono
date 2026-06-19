"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PlannerRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page with query param so SPA renders planner view
    router.replace("/?view=planner");
  }, [router]);

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-muted text-sm font-semibold">Mengalihkan ke Planner...</p>
      </div>
    </div>
  );
}
