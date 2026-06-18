import { MapPin, Heart, Cpu, Activity, Route } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/70 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                Golek<span className="text-primary-light">Ono</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              AI-powered Smart Tourism & Itinerary Planner untuk Yogyakarta.
              Analisis sentimen ulasan pengunjung untuk perjalanan terbaik.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/planner"
                  className="text-sm hover:text-white transition-colors"
                >
                  Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Teknologi
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary-light" />
                <span>Machine Learning & NLP</span>
              </li>
              <li className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary-light" />
                <span>Sentiment Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary-light" />
                <span>Smart Route Planning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} GolekOno. All rights reserved.
          </p>
          <p className="text-xs text-white/50 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary-light fill-primary-light" /> in Yogyakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
