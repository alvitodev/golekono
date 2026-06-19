import { Heart, Cpu, Activity, Route } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  currentView?: "home" | "planner" | "guide";
  setCurrentView?: (view: "home" | "planner" | "guide") => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const handleLinkClick = (href: string, view: "home" | "planner" | "guide", e: React.MouseEvent) => {
    if (setCurrentView) {
      e.preventDefault();
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const newUrl = view === "home" ? "/" : `/?view=${view}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  return (
    <footer className="bg-charcoal text-white/70 mt-auto border-t border-stone/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              href="/" 
              onClick={(e) => handleLinkClick("/", "home", e)}
              className="flex items-center gap-2 transition-transform duration-200 hover:scale-102"
            >
              <img 
                src="/golekono logo.png" 
                alt="GolekOno Logo" 
                className="h-10 w-auto object-contain brightness-0 invert opacity-80"
              />
              <span className="font-display text-xl font-bold tracking-tight flex items-center select-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">Golek</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">Ono</span>
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
                  onClick={(e) => handleLinkClick("/", "home", e)}
                  className="text-sm hover:text-white transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/planner"
                  onClick={(e) => handleLinkClick("/planner", "planner", e)}
                  className="text-sm hover:text-white transition-colors"
                >
                  Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  onClick={(e) => handleLinkClick("/guide", "guide", e)}
                  className="text-sm hover:text-white transition-colors"
                >
                  Panduan
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
                <Cpu className="h-4 w-4 text-accent" />
                <span>Machine Learning & NLP</span>
              </li>
              <li className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" />
                <span>Sentiment Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Route className="h-4 w-4 text-accent" />
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
            Made with <Heart className="h-3 w-3 text-accent fill-accent" /> in Yogyakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
