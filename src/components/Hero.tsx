// src/components/Hero.tsx
// Hero section: candidate photo + headline/subtitle/CTA, with a decorative
// animated Algeria map outline placed behind the text in the secondary color.
import Image from "next/image";
import { useTranslations } from "next-intl";
import AlgeriaMap from "./AlgeriaMap";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="bg-primary text-primary-on relative overflow-hidden">
      <div className="max-w-container mx-auto px-4 md:px-16 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 relative">
        {/* Candidate photo */}
        <div className="relative w-full h-full sm:h-72 md:h-[420px] md:w-[300px] lg:w-[380px] rounded-lg overflow-hidden shrink-0 z-10" >
          <Image
            src="/images/candidate-hero.png"
            alt=""
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Text content */}
        <div className="flex-1 text-center md:text-start relative z-10">
          <h1 className="font-cairo font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.4] mb-5" style={{ lineHeight: "1.4" }}>
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

        {/* Decorative Algeria map outline - behind text, secondary color, low opacity */}
        <AlgeriaMap className="absolute end-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[450px] lg:w-[550px] text-secondary opacity-[0.12] pointer-events-none z-0" />
      </div>
    </section>
  );
}
