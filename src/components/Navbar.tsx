// src/components/Navbar.tsx
// Sticky top navigation: brand name, nav links, language switcher, and "Vote Now" CTA.
// Layout naturally mirrors between RTL (ar) and LTR (en/fr) via the html[dir] attribute
// inherited from layout.tsx - no manual flex-direction flipping needed.
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  // Section anchor links shown in the nav (desktop + mobile)
  const links = [
    { href: "#vision", label: t("vision") },
    { href: "#about", label: t("about") },
    { href: "#vote", label: t("commitment") },
    { href: "#initiatives", label: t("initiatives") },
  ];

  return (
    <header className="bg-primary text-primary-on sticky top-0 z-50">
      <nav className="max-w-container mx-auto flex items-center justify-between px-4 md:px-16 py-4">
        {/* Brand / campaign name */}
        <Link href="/" className="font-cairo font-extrabold text-xl md:text-2xl">
          {t("brand")}
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 font-inter font-semibold text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-accent transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language switcher + Vote CTA (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <a
            href="#vote"
            className="bg-secondary text-secondary-on font-inter font-bold text-sm px-5 py-2 rounded-sm hover:bg-secondary/90 transition-colors"
          >
            {t("voteNow")}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 font-inter font-semibold text-sm">
          {links.map((link) => (
           <a 
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="#vote"
            onClick={() => setOpen(false)}
            className="bg-secondary text-secondary-on font-bold text-sm px-5 py-2 rounded-sm text-center"
          >
            {t("voteNow")}
          </a>
        </div>
      )}
    </header>
  );
}