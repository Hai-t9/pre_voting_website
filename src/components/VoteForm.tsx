// src/components/VoteForm.tsx
// "Pledge of Commitment" form: name, searchable wilaya combobox, email,
// "would you vote" select, optional message, and submit to /api/vote.
"use client";

import { useState, useMemo, FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { wilayas } from "@/data/wilayas";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export default function VoteForm() {
  const t = useTranslations("voteForm");
  const locale = useLocale() as "ar" | "en" | "fr";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [wouldVote, setWouldVote] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Wilaya combobox state
  const [wilayaQuery, setWilayaQuery] = useState("");
  const [wilayaCode, setWilayaCode] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter wilayas dynamically by code, ar/en/fr name, matching the typed query
  const filteredWilayas = useMemo(() => {
    const q = wilayaQuery.trim().toLowerCase();
    if (!q) return wilayas;
    return wilayas.filter(
      (w) =>
        w.code.includes(q) ||
        w.ar.includes(wilayaQuery.trim()) ||
        w.en.toLowerCase().includes(q) ||
        w.fr.toLowerCase().includes(q)
    );
  }, [wilayaQuery]);

  const selectWilaya = (code: string) => {
    const w = wilayas.find((w) => w.code === code)!;
    setWilayaCode(code);
    setWilayaQuery(`${w.code} - ${w[locale]}`);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !wilayaCode || !wouldVote) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          wilayaCode,
          wouldVote,
          message,
          locale,
        }),
      });

      if (res.status === 409) {
        setStatus("duplicate");
      } else if (!res.ok) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  };

  const wouldVoteOptions = t.raw("wouldVoteOptions") as Record<string, string>;

  return (
    <section id="vote" className="bg-background">
      <div className="max-w-container mx-auto px-4 md:px-16 py-16 flex justify-center">
        <div className="w-full max-w-2xl bg-surface rounded-lg shadow-whisper p-6 md:p-10">
          <h2 className="font-cairo font-extrabold text-2xl md:text-3xl text-center mb-2">
            {t("title")}
          </h2>
          <p className="font-plexArabic text-sm text-charcoal/70 text-center mb-8">
            {t("subtitle")}
          </p>

          {status === "success" ? (
            <p className="text-center font-cairo font-bold text-secondary py-8">{t("success")}</p>
          ) : status === "duplicate" ? (
            <p className="text-center font-cairo font-bold text-error py-8">{t("duplicate")}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label className="block font-inter text-sm font-semibold mb-1">{t("fullName")}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("fullNamePlaceholder")}
                  required
                  className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                />
              </div>

              {/* Wilaya + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Searchable wilaya combobox */}
                <div className="relative">
                  <label className="block font-inter text-sm font-semibold mb-1">{t("wilaya")}</label>
                  <input
                    type="text"
                    value={wilayaQuery}
                    onChange={(e) => {
                      setWilayaQuery(e.target.value);
                      setWilayaCode("");
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                    placeholder={t("wilayaPlaceholder")}
                    required
                    className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                  />
                  {/* Hidden input ensures the form requires a valid selection */}
                  <input type="hidden" value={wilayaCode} required />
                  {showDropdown && (
                    <ul className="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto bg-surface border border-outline-light rounded-sm shadow-whisper">
                      {filteredWilayas.length === 0 && (
                        <li className="px-4 py-2 text-sm text-charcoal/50">—</li>
                      )}
                      {filteredWilayas.map((w) => (
                        <li
                          key={w.code}
                          onClick={() => selectWilaya(w.code)}
                          className="px-4 py-2 text-sm font-plexArabic hover:bg-background cursor-pointer"
                        >
                          {w.code} - {w[locale]}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-inter text-sm font-semibold mb-1">{t("email")}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    required
                    dir="ltr"
                    className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-inter text-start focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Would vote */}
              <div>
                <label className="block font-inter text-sm font-semibold mb-1">{t("wouldVote")}</label>
                <select
                  value={wouldVote}
                  onChange={(e) => setWouldVote(e.target.value)}
                  required
                  className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                >
                  <option value="" disabled>
                    {t("wouldVotePlaceholder")}
                  </option>
                  {Object.entries(wouldVoteOptions).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block font-inter text-sm font-semibold mb-1">{t("message")}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  rows={4}
                  className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                />
              </div>

              {status === "error" && (
                <p className="text-error text-sm font-inter">{t("error")}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-secondary text-secondary-on font-inter font-bold py-3 rounded-sm hover:bg-secondary/90 transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "..." : t("submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}