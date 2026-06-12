// src/components/Footer.tsx
// Footer: brand + description on one side, quick links + social/contact on the other.
// DOM order [brand block, links block] mirrors the same way as Timeline.
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const quickLinks = [
    { href: "#vision", label: nav("vision") },
    { href: "#about", label: nav("about") },
    { href: "#vote", label: nav("commitment") },
  ];

  // Example social array (use camelCase for properties like ariaLabel)
  const socialLinks = [
    { key: "fb", href: "#", ariaLabel: "Facebook", icon: "FB" },
    { key: "tw", href: "#", ariaLabel: "Twitter", icon: "TW" },
  ];

  return (
    <footer className="bg-primary text-primary-on">
      <div className="max-w-container mx-auto px-4 md:px-16 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand + description */}
        <div className="max-w-md">
          <h3 className="font-cairo font-extrabold text-xl mb-3">{t("name")}</h3>
          <p className="font-plexArabic text-sm text-primary-on/80">{t("description")}</p>
        </div>

        {/* Links + social */}
        <div className="flex flex-col sm:flex-row gap-10">
          
          {/* Quick Links */}
          <div>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links (Fixed mapping syntax) */}
          <div className="flex gap-4">
            {socialLinks.map(({ key, href, ariaLabel, icon }) => (
              <a
                key={key}
                href={href}
                aria-label={ariaLabel}
                className="hover:opacity-80"
              >
                {icon}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}