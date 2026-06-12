// src/components/ActivitiesCarousel.tsx
// "Field Activities" section: horizontal scrollable cards on a primary background,
// with prev/next scroll buttons.
"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function ActivitiesCarousel() {
  const t = useTranslations("activities");
  const items = t.raw("items") as { tag: string; year: string; title: string; description: string }[];
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scrolls the carousel by one card width in the given direction
  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section id="initiatives" className="bg-primary text-primary-on">
      <div className="max-w-container mx-auto px-4 md:px-16 py-16">
        <div className="flex items-center justify-between mb-8">
          
          <div className="flex flex-col gap-4 mb-10">
            <span className="h-1 w-20 bg-secondary rounded-full order-2" />
            <h2 className="font-cairo font-extrabold text-2xl md:text-3xl">{t("title")}</h2>
          </div>

          {/* Scroll buttons */}
          <div className="flex gap-2 mb-8">
          <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="w-9 h-9 flex items-center justify-center border-2 border-primary-on rounded-sm font-bold hover:bg-primary-on/10"            >
              →
            </button>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="w-9 h-9 flex items-center justify-center border-2 border-primary-on rounded-sm font-bold hover:bg-primary-on/10"            >
              ←
            </button>
          </div>

          
        </div>

        {/* Scrollable cards */}
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {items.map((item, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-64 bg-surface text-charcoal rounded-lg overflow-hidden shadow-whisper"
            >
              <div className="relative w-full h-36">
                <Image src={`/images/activity-${i + 1}.png`} alt="" fill className="object-cover" />
                <span className="absolute top-2 end-2 bg-accent text-charcoal text-xs font-inter font-bold px-2 py-1 rounded-sm">
                  {item.tag}
                </span>
              </div>
              <div className="p-4">
                <p className="font-inter text-xs text-charcoal/60 mb-1">{item.year}</p>
                <h3 className="font-cairo font-bold text-base mb-2">{item.title}</h3>
                <p className="font-plexArabic text-sm text-charcoal/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}