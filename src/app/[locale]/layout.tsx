// src/app/[locale]/layout.tsx
// Root layout: sets html lang/dir per locale, loads fonts, provides translations
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "السيدة المرشحة | Madame La Candidate",
  description: "El-Djazair Presidential 2024 Campaign",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale, 404 if unsupported
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  // RTL only for Arabic, LTR mirrors for en/fr
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-background text-charcoal font-plexArabic">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}