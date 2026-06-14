// src/components/VisionCards.tsx
// "Our Vision for the Future" section: 4 cards with icon, title, description.
import { useTranslations } from "next-intl";

// Simple geometric 2px-stroke icons matching DESIGN.md iconography rules
const icons = [
  // Coin / economic dignity
  <svg key="coin" className="text-secondary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9 9.5h4a1.5 1.5 0 010 3h-2a1.5 1.5 0 000 3h4" strokeLinecap="round" />
  </svg>,
  // Bar chart / local development
  <svg key="chart" className="text-secondary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 20V10M10 20V4M16 20v-7M20 20H4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Graduation cap / youth & education
  <svg key="cap" className="text-secondary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 8l10-4 10 4-10 4-10-4z" strokeLinejoin="round" />
    <path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" strokeLinejoin="round" />
  </svg>,
  // Shield check / accountability & transparency
  <svg key="shield" className="text-secondary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l8 3v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V6l8-3z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function VisionCards() {
  const t = useTranslations("vision");
  const cards = t.raw("cards") as { title: string; description: string }[];

  return (
    <section id="vision" className="bg-background">
      <div className="max-w-container mx-auto px-4 md:px-16 py-16">
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
          <h2 className="font-cairo font-extrabold text-2xl md:text-3xl">{t("title")}</h2>
          <span className="h-1 w-20 bg-secondary rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
  <div
    key={i}
    className="group flex flex-col bg-gradient-to-b from-surface to-transparent shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.05)] rounded-t-lg overflow-hidden transition-transform duration-300 hover:-translate-y-4"
  >
    {/* 2. Added 'transition-all duration-300' for a smooth height change, and 'group-hover:h-4' */}
    <span className="h-1 w-full bg-secondary block transition-all duration-300 group-hover:h-2" />
    
    <div className="p-6">
      <div className="w-12 h-12 rounded-sm bg-secondary/20 text-primary-on flex items-center justify-center mb-4">
        {icons[i]}
      </div>
      <h3 className="font-cairo font-bold text-lg mb-2">{card.title}</h3>
      <p className="font-plexArabic text-sm text-charcoal/80">{card.description}</p>
    </div>
  </div>
))}

        </div>


      </div>
    </section>
  );
}
