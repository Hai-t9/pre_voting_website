// src/components/VoteSuccess.tsx
// Modern success confirmation animation: green circle with stroke-drawn checkmark,
// subtle glow pulse, and fade-in message. Inspired by banking/fintech/voting platforms.

"use client";

import { useEffect, useState } from "react";

export default function VoteSuccess({ message }: { message: string }) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Fade in the message after the circle + checkmark animation finishes (~1s)
    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Animated circle + checkmark */}
      <div className="relative mb-6">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />

        {/* Circle container */}
        <div className="relative w-20 h-20 rounded-full bg-green-600 animate-scale-in flex items-center justify-center">
          {/* Checkmark SVG */}
          <svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M5 13l4 4L19 7"
              className="animate-draw-check"
              strokeDasharray="24"
              strokeDashoffset="24"
            />
          </svg>
        </div>
      </div>

      {/* Success message */}
      <div
        className={`transition-all duration-700 ease-out ${
          showMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <p className="text-green-700 font-semibold text-lg text-center">
          {message}
        </p>
      </div>
    </div>
  );
}
