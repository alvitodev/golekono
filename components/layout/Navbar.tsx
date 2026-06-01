"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/planner", label: "Planner" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-sand/80 border-b border-stone">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-transform duration-200 group-hover:scale-105">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold text-charcoal tracking-tight">
              Golek<span className="text-primary">Ono</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-muted rounded-lg transition-colors hover:text-charcoal hover:bg-stone"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/planner"
              className="ml-3 px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-full transition-all duration-200 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25"
            >
              Mulai Rancang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-charcoal rounded-lg hover:bg-stone transition-colors"
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-slate-muted rounded-lg hover:text-charcoal hover:bg-stone transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/planner"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 px-4 py-3 text-center text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary-dark transition-colors"
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
