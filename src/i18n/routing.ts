// src/i18n/routing.ts
// Defines supported locales and routing behavior for next-intl
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en", "fr"],
  defaultLocale: "ar",
  // ar has no prefix (default), en/fr get /en and /fr prefixes
  localePrefix: "as-needed",
});