"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentView?: "home" | "planner" | "guide";
  setCurrentView?: (view: "home" | "planner" | "guide") => void;
}

const navLinks = [
  { href: "/", label: "Beranda", view: "home" as const },
  { href: "/planner", label: "Planner", view: "planner" as const },
  { href: "/guide", label: "Panduan", view: "guide" as const },
];

export default function Navbar({ currentView = "home", setCurrentView }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string, view: "home" | "planner" | "guide", e: React.MouseEvent) => {
    if (setCurrentView) {
      e.preventDefault();
      setCurrentView(view);
      setMobileOpen(false);
      // Smooth scroll to top on tab switch
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Update stateful URL without refreshing page
      const newUrl = view === "home" ? "/" : `/?view=${view}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "backdrop-blur-md bg-sand/85 border-b border-stone/80 shadow-[0_2px_12px_rgba(22,37,24,0.04)]"
        : "backdrop-blur-none bg-transparent border-b border-transparent shadow-none"
    }`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={(e) => handleLinkClick("/", "home", e)}
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-102"
          >
            <img 
              src="/golekono logo.png" 
              alt="GolekOno Logo" 
              className="h-11 sm:h-13 w-auto object-contain py-1"
            />
            <span className="font-display text-2xl font-bold tracking-tight flex items-center select-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Golek</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">Ono</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, link.view, e)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-stone/80"
                      : "text-slate-muted hover:text-charcoal hover:bg-stone/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/planner"
              onClick={(e) => handleLinkClick("/planner", "planner", e)}
              className="ml-3 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:scale-102 active:scale-98"
            >
              Mulai Rancang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-charcoal rounded-lg hover:bg-stone/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-stone bg-sand/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, link.view, e)}
                    className={`block px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-stone"
                        : "text-slate-muted hover:text-charcoal hover:bg-stone/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/planner"
                onClick={(e) => handleLinkClick("/planner", "planner", e)}
                className="block mt-2 px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-dark rounded-full hover:shadow-lg transition-all"
              >
                Mulai Rancang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
