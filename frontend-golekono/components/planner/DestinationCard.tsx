"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import PriceTag from "@/components/ui/PriceTag";
import { truncateText } from "@/lib/formatters";
import { SENTIMENT_COLORS } from "@/lib/constants";
import type { DestinationCardProps } from "@/types";

export default function DestinationCard({ destination }: DestinationCardProps) {
  const sentimentStyle =
    SENTIMENT_COLORS[destination.sentiment_label] || SENTIMENT_COLORS["Netral"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl border border-stone overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.nama}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge label={destination.type} />
        </div>

        {/* Rating overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <StarRating rating={destination.vote_average} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Name */}
        <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-primary transition-colors duration-200">
          {destination.nama}
        </h3>

        {/* AI Sentiment Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border
            ${sentimentStyle.bg} ${sentimentStyle.text} ${sentimentStyle.border}`}
        >
          <Sparkles className="h-3 w-3" />
          <span>AI Verified: Sentimen {destination.sentiment_label}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-muted leading-relaxed">
          {truncateText(destination.description, 130)}
        </p>

        {/* Footer */}
        <div className="pt-3 border-t border-stone flex items-center justify-between">
          <PriceTag amount={destination.htm_weekday} />
          <span className="text-xs text-slate-muted">HTM Weekday</span>
        </div>
      </div>
    </motion.div>
  );
}
