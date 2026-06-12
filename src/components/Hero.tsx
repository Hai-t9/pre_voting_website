// src/components/Hero.tsx
// Hero section: candidate photo + headline/subtitle/CTA on a primary-colored background.
// Fixes applied:
// - sm: shorter image height + object-top so the face stays visible (not cropped from below)
// - md: narrower image (300px) so text has more breathing room, no overlap
// - headline/subtitle: increased line-height (leading) to fix line overlap
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="bg-primary text-primary-on">
      <div className="max-w-container mx-auto px-4 md:px-16 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        {/* Candidate photo */}
        <div className="relative w-full h-64 sm:h-72 md:h-[420px] md:w-[300px] lg:w-[380px] rounded-lg overflow-hidden shrink-0">
          <Image
            src="/images/candidate-hero.png"
            alt=""
            fill
            priority
            // object-top keeps the face visible; adjust to object-[center_15%] if needed
            className="object-cover object-top"
          />
        </div>

        {/* Text content */}
        <div className="flex-1 text-center md:text-start">
          <h1 className="font-cairo font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.4] mb-5">
            {t("title")}
          </h1>
          <p className="font-plexArabic text-base md:text-lg leading-loose text-primary-on/80 mb-8 max-w-xl mx-auto md:mx-0">
            {t("subtitle")}
          </p>
          <a
            href="#vote"
            className="inline-block bg-secondary text-secondary-on font-inter font-bold px-8 py-3 rounded-sm hover:bg-secondary/90 transition-colors"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}