// src/components/VoteForm.tsx
"use client";

import { useState, useMemo, FormEvent } from "react";
// ─── COUNTER: also uncomment `useEffect` below when activating the counter ───
// import { useState, useMemo, FormEvent, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import VoteSuccess from "@/components/VoteSuccess";
import { wilayas } from "@/data/wilayas";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export default function VoteForm() {
  const t = useTranslations("voteForm");
  const locale = useLocale() as "ar" | "en" | "fr";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [wouldVote, setWouldVote] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [volunteerInterest, setVolunteerInterest] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ─── SUPPORTER COUNTER ────────────────────────────────────────────────────
  // To activate the live counter:
  //   1. Uncomment the `useEffect` import at the top of this file
  //   2. Uncomment the block below
  //   3. Uncomment the counter JSX section further down (search for COUNTER_JSX)
  //
  // const [supporterCount, setSupporterCount] = useState<number | null>(null);
  // useEffect(() => {
  //   fetch("/api/keep-alive")
  //     .then((r) => r.json())
  //     .then((d) => setSupporterCount(d.voteCount ?? null))
  //     .catch(() => {});
  // }, []);
  // ──────────────────────────────────────────────────────────────────────────

  // Wilaya combobox state
  const [wilayaQuery, setWilayaQuery] = useState("");
  const [wilayaCode, setWilayaCode] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter and sort wilayas by name match priority
  const filteredWilayas = useMemo(() => {
    const q = wilayaQuery.trim().toLowerCase();
    if (!q) return wilayas;

    const matches = wilayas.filter(
      (w) =>
        w.en.toLowerCase().includes(q) ||
        w.fr.toLowerCase().includes(q) ||
        w.ar.includes(wilayaQuery.trim()) ||
        w.code.includes(q),
    );

    return matches.sort((a, b) => {
      const aEn = a.en.toLowerCase();
      const bEn = b.en.toLowerCase();
      const aStarts = aEn.startsWith(q);
      const bStarts = bEn.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      const aContains = aEn.includes(q);
      const bContains = bEn.includes(q);
      if (aContains && !bContains) return -1;
      if (!aContains && bContains) return 1;
      return a.en.localeCompare(b.en);
    });
  }, [wilayaQuery]);

  const selectWilaya = (code: string) => {
    const w = wilayas.find((w) => w.code === code)!;
    setWilayaCode(code);
    setWilayaQuery(`${w[locale]} (${w.code})`);
    setShowDropdown(false);
  };

  const isValidAlgerianPhone = (num: string) => {
    const clean = num.replace(/[\s\-()]/g, "");
    return (
      /^(05|06|07|02|03|04|08|09)[0-9]{8}$/.test(clean) ||
      /^\+213[567023489][0-9]{8}$/.test(clean)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !wilayaCode || !wouldVote) return;

    if (phone && !isValidAlgerianPhone(phone)) {
      setStatus("error");
      setErrorMessage(t("phoneError"));
      return;
    }

    if (!consent) {
      setStatus("error");
      setErrorMessage(t("consentError"));
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          wilayaCode,
          wouldVote,
          municipality,
          volunteerInterest,
          message,
          locale,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setStatus("duplicate");
        setErrorMessage(data.error || t("duplicate"));
      } else if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || t("error"));
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  const wouldVoteOptions = t.raw("wouldVoteOptions") as Record<string, string>;
  const volunteerOptions = t.raw("volunteerOptions") as Record<string, string>;

  return (
    <section id="vote" className="bg-background">
      <div className="max-w-container mx-auto px-4 md:px-16 py-16 flex justify-center">
        <div className="w-full max-w-2xl bg-surface rounded-lg shadow-whisper p-6 md:p-10">
          {/* ── COUNTER_JSX ── To activate: uncomment the block below ──────────
          {supporterCount !== null && (
            <div className="text-center mb-6 py-3 bg-primary/10 rounded-lg">
              <span className="font-cairo font-extrabold text-2xl text-primary">
                {supporterCount.toLocaleString()}
              </span>
              <span className="font-plexArabic text-sm text-charcoal/70 ms-2">
                {t("counter")}
              </span>
            </div>
          )}
          ── END COUNTER_JSX ─────────────────────────────────────────────── */}

          <h2 className="font-cairo font-extrabold text-2xl md:text-3xl text-center mb-2">
            {t("title")}
          </h2>
          <p className="font-plexArabic text-sm text-charcoal/70 text-center mb-8">
            {t("subtitle")}
          </p>

          {status === "success" ? (
            <div className="py-4">
              <VoteSuccess message={t("success")} />
            </div>
          ) : status === "duplicate" ? (
            <p className="text-center font-cairo font-bold text-error py-8">
              {t("duplicate")}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First & Last name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-inter text-sm font-semibold mb-1">
                    {t("firstName")}
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t("firstNamePlaceholder")}
                    required
                    className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-inter text-sm font-semibold mb-1">
                    {t("lastName")}
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t("lastNamePlaceholder")}
                    required
                    className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Wilaya + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Searchable wilaya combobox */}
                <div className="relative">
                  <label className="block font-inter text-sm font-semibold mb-1">
                    {t("wilaya")}
                  </label>
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
                  <input type="hidden" value={wilayaCode} required />
                  {showDropdown && (
                    <ul className="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto bg-surface border border-outline-light rounded-sm shadow-whisper">
                      {filteredWilayas.length === 0 && (
                        <li className="px-4 py-2 text-sm text-charcoal/50">
                          —
                        </li>
                      )}
                      {filteredWilayas.map((w) => (
                        <li
                          key={w.code}
                          onMouseDown={() => selectWilaya(w.code)}
                          className="px-4 py-2 text-sm font-plexArabic hover:bg-background cursor-pointer"
                        >
                          {w[locale]} ({w.code})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-inter text-sm font-semibold mb-1">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("phonePlaceholder")}
                    pattern="[0-9\s\-()+]{10,}"
                    title="Algerian phone number (e.g., 05XX XX XX XX)"
                    required
                    dir="ltr"
                    className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-inter text-start focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Municipality (optional) */}
              <div>
                <label className="block font-inter text-sm font-semibold mb-1">
                  {t("municipality")}
                </label>
                <input
                  type="text"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  placeholder={t("municipalityPlaceholder")}
                  className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                />
              </div>

              {/* Would vote */}
              <div>
                <label className="block font-inter text-sm font-semibold mb-1">
                  {t("wouldVote")}
                </label>
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

              {/* Volunteer interest */}
              <div>
                <label className="block font-inter text-sm font-semibold mb-1">
                  {t("volunteerTitle")}
                </label>
                <select
                  value={volunteerInterest}
                  onChange={(e) => setVolunteerInterest(e.target.value)}
                  className="w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                >
                  <option value="" disabled>
                    {t("wouldVotePlaceholder")}
                  </option>
                  {Object.entries(volunteerOptions).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message — collapsed behind a toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowMessage((v) => !v)}
                  className="text-sm font-inter text-primary underline underline-offset-2 hover:opacity-80"
                >
                  {t("messageToggle")} {showMessage ? "▲" : "▼"}
                </button>
                {showMessage && (
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("messagePlaceholder")}
                    rows={3}
                    className="mt-2 w-full bg-background border border-outline-light rounded-sm px-4 py-2 font-plexArabic focus:border-primary focus:outline-none"
                  />
                )}
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary cursor-pointer shrink-0"
                />
                <label
                  htmlFor="consent"
                  className="font-plexArabic text-sm text-charcoal/80 cursor-pointer"
                >
                  {t("consent")}
                </label>
              </div>

              {status === "error" && (
                <p className="text-error text-sm font-inter">{errorMessage}</p>
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
