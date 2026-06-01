# GolekOno — Implementation Walkthrough

## Overview

Built the complete frontend for **GolekOno**, an AI-powered Smart Tourism & Itinerary Planner for Yogyakarta. The app features a Landing Page and a Planner Page with a full form → AI loading → results flow, all running on mock data ready for backend integration.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.2.6 | App Router framework |
| React | 19.2.4 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | v4 | Styling (with `@theme` tokens) |
| Framer Motion | ^12.40 | Animations |
| Lucide React | ^1.17 | Icon library |

---

## What Was Built

### 24 Files Created

#### Foundation
- [types/index.ts](file:///c:/Users/Alvito/Documents/Code/golekono/types/index.ts) — TypeScript interfaces for API contract
- [lib/constants.ts](file:///c:/Users/Alvito/Documents/Code/golekono/lib/constants.ts) — Interest options, badge colors, limits
- [lib/formatters.ts](file:///c:/Users/Alvito/Documents/Code/golekono/lib/formatters.ts) — Rupiah formatting, text truncation
- [lib/mockData.ts](file:///c:/Users/Alvito/Documents/Code/golekono/lib/mockData.ts) — 3-day mock itinerary response
- [lib/api/mockItinerary.ts](file:///c:/Users/Alvito/Documents/Code/golekono/lib/api/mockItinerary.ts) — Mock API with 2s delay

#### Layout & Theme
- [app/globals.css](file:///c:/Users/Alvito/Documents/Code/golekono/app/globals.css) — Jogja Heritage design tokens
- [app/layout.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/app/layout.tsx) — Root layout with Google Fonts
- [next.config.ts](file:///c:/Users/Alvito/Documents/Code/golekono/next.config.ts) — Cloudinary image domain config
- [Navbar.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/layout/Navbar.tsx) — Responsive navbar with mobile drawer
- [Footer.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/layout/Footer.tsx) — Site footer

#### Landing Page (`/`)
- [app/page.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/app/page.tsx) — Landing page
- [HeroSection.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/landing/HeroSection.tsx) — Hero with gradient text, stats
- [FeaturesSection.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/landing/FeaturesSection.tsx) — 3-step how-it-works
- [FeatureCard.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/landing/FeatureCard.tsx) — Individual step card

#### Planner Page (`/planner`)
- [app/planner/page.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/app/planner/page.tsx) — Planner orchestrator
- [PreferenceForm.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/PreferenceForm.tsx) — Form wrapper
- [InterestPills.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/InterestPills.tsx) — Multi-select pills
- [SuasanaInput.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/SuasanaInput.tsx) — NLP textarea
- [BudgetSlider.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/BudgetSlider.tsx) — Range slider
- [DurationStepper.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/DurationStepper.tsx) — +/- stepper
- [LoadingState.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/LoadingState.tsx) — AI processing animation
- [ResultView.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/ResultView.tsx) — Results wrapper
- [SummarySection.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/SummarySection.tsx) — Total cost banner
- [DayTimeline.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/DayTimeline.tsx) — Day tab navigation
- [DestinationCard.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/planner/DestinationCard.tsx) — Destination card with AI badge

#### UI Primitives
- [Button.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/ui/Button.tsx) — Reusable button
- [Badge.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/ui/Badge.tsx) — Category badge
- [StarRating.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/ui/StarRating.tsx) — Star + rating
- [PriceTag.tsx](file:///c:/Users/Alvito/Documents/Code/golekono/components/ui/PriceTag.tsx) — Rupiah price

---

## Screenshots

### Landing Page

````carousel
![Hero Section — gradient headline, CTA, and stats](C:/Users/Alvito/.gemini/antigravity/brain/fa30d00b-be29-4350-ac96-f4e1d76ee727/hero_section.png)
<!-- slide -->
![Features Section — 3-step "Cara Kerja" cards](C:/Users/Alvito/.gemini/antigravity/brain/fa30d00b-be29-4350-ac96-f4e1d76ee727/features_section.png)
````

### Planner Page

````carousel
![Preference Form — pills, NLP textarea, budget slider, duration stepper](C:/Users/Alvito/.gemini/antigravity/brain/fa30d00b-be29-4350-ac96-f4e1d76ee727/planner_form.png)
<!-- slide -->
![Results View — summary banner, day tabs, destination cards with AI sentiment badges](C:/Users/Alvito/.gemini/antigravity/brain/fa30d00b-be29-4350-ac96-f4e1d76ee727/planner_results.png)
````

### Full Planner Flow Recording

![Complete planner flow: form → loading → results → day tab switching](C:/Users/Alvito/.gemini/antigravity/brain/fa30d00b-be29-4350-ac96-f4e1d76ee727/planner_flow.webp)

---

## Key Design Decisions

1. **Tailwind v4 `@theme` tokens** — Used instead of `tailwind.config.ts` since the scaffolded project uses Tailwind v4.
2. **Framer Motion `layoutId`** — Used on the day tabs for smooth active-indicator sliding animation.
3. **AnimatePresence mode="wait"** — Ensures clean form → loading → result transitions without overlapping elements.
4. **Mock API isolation** — `lib/api/mockItinerary.ts` is the single file to swap when the Django backend is ready. Components are fully decoupled from the data source.

---

## Backend Integration Notes

> [!TIP]
> When the Django backend is ready, only **one file** needs to change:

```diff
// lib/api/mockItinerary.ts
export async function generateItinerary(
  preferences: UserPreferences
): Promise<ItineraryResponse> {
-  await new Promise((resolve) => setTimeout(resolve, 2000));
-  return buildMockResponse(preferences);
+  const res = await fetch("https://api.golekono.com/generate", {
+    method: "POST",
+    headers: { "Content-Type": "application/json" },
+    body: JSON.stringify(preferences),
+  });
+  return res.json();
}
```

---

## Testing Performed

- ✅ Landing page renders at `/` — hero, features, footer
- ✅ Planner form at `/planner` — all 5 interest pills, NLP textarea, budget slider, duration stepper
- ✅ Form validation — disabled submit until at least 1 interest selected
- ✅ Loading state — animated brain icon with step indicators
- ✅ Results view — summary banner, day tabs (Hari 1/2/3), destination cards
- ✅ AI Sentiment Badge — "✨ AI Verified: Sentimen Positif" renders on all cards
- ✅ Day tab switching — animated transition with `layoutId`
- ✅ "Rancang Ulang" button — resets to form
- ✅ Cloudinary images — Borobudur, Prambanan, Tebing Breksi load correctly
- ⚠️ Some mock Cloudinary URLs return 404 (Taman Sari, Parangtritis, Ullen Sentalu) — these are placeholder URLs in the mock data and will be replaced with real images from your dataset
