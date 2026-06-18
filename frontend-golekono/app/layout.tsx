import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GolekOno — AI Smart Tourism Planner Yogyakarta",
  description:
    "Rencanakan perjalanan wisata Yogyakarta Anda dengan AI. GolekOno menganalisis sentimen ulasan pengunjung untuk menyusun itinerary terbaik sesuai preferensi Anda.",
  keywords: [
    "wisata yogyakarta",
    "itinerary planner",
    "AI tourism",
    "GolekOno",
    "jogja trip planner",
  ],
  openGraph: {
    title: "GolekOno — AI Smart Tourism Planner Yogyakarta",
    description:
      "Rencanakan perjalanan wisata Yogyakarta dengan teknologi AI & analisis sentimen.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
