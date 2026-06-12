// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // From DESIGN.md - El-Djazair Presidential 2024
        primary: "#044335",
        "primary-on": "#ffffff",
        secondary: "#00B753",
        "secondary-on": "#ffffff",
        accent: "#9CE641",
        background: "#F7F9F8",
        surface: "#ffffff",
        charcoal: "#1A2522",
        "outline-light": "rgba(26,37,34,0.1)",
      },
      fontFamily: {
        // Headlines
        cairo: ["Cairo", "sans-serif"],
        // Arabic body text
        plexArabic: ["IBM Plex Arabic", "sans-serif"],
        // Latin labels/UI (en/fr)
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem", // buttons/inputs - 4px
        lg: "0.5rem",  // cards/hero - 8px
      },
      boxShadow: {
        // "Whisper Shadow" from DESIGN.md
        whisper: "0px 4px 12px rgba(26, 37, 34, 0.05)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;