// src/components/LanguageSwitcher.tsx
// Text-only language toggle (En / Fr / Ar) per DESIGN.md.
// Always rendered LTR so the "En Fr Ar" order stays consistent regardless of page direction.
// Active language is underlined with a 2px accent stroke.
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { code: "en", label: "En" },
  { code: "fr", label: "Fr" },
  { code: "ar", label: "Ar" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div dir="ltr" className="flex items-center gap-3 font-inter font-bold text-sm">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={`pb-1 transition-colors ${
            locale === code
              ? "border-b-2 border-accent text-primary-on"
              : "text-primary-on/60 hover:text-accent"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}