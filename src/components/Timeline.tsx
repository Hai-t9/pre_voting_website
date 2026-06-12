// src/components/Timeline.tsx
// "Journey of Activism" section: text + timeline on one side, photo on the other.
// DOM order is [content, image]. Under dir="rtl" (ar) content→right, image→left
// (matches design). Mirrors automatically for dir="ltr" (en/fr).
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Timeline() {
  const t = useTranslations("timeline");
  const items = t.raw("items") as { year: string; label: string; description: string }[];

  return (
    <section id="about" className="bg-background">
      <div className="max-w-container mx-auto px-4 md:px-16 py-16">
        <h2 className="font-cairo font-extrabold text-2xl md:text-3xl mb-10">{t("title")}</h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Content: intro + timeline */}
          <div className="flex-1">
            <p className="font-plexArabic text-base text-charcoal/80 mb-8 max-w-xl">
              {t("intro")}
            </p>

            <ul className="relative ps-6 border-outline-light space-y-8">

              {items.map((item, i) => (
                <li key={i} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -start-[1.6rem] top-1 w-3 h-3 rounded-full bg-secondary" />
                  <p className="font-cairo font-bold text-lg">
                    {item.year} - {item.label}
                  </p>
                  <p className="font-plexArabic text-sm text-charcoal/80 mt-1">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Image with caption */}
          <div className="flex-1 md:max-w-md">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <Image src="/images/fieldwork.png" alt="" fill className="object-cover" />
               {/* Green overlay layer */}
               <div className="absolute inset-0 bg-secondary/15 pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 bg-primary/80 text-primary-on text-sm font-plexArabic px-4 py-2">
                {t("imageCaption")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}