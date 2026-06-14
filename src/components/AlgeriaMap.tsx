// src/components/AlgeriaMap.tsx
// 2 draw/erase loops, then a 3rd draw that stays fully drawn (no erase/jump).
"use client";
import { useRef, useState, useEffect } from "react";

const PATH_LENGTH = 1450;
const ALGERIA_PATH = 
    "M 334.9,34.3 C 319.8,32.9 281.5,32.5 259.7,33.4 C 237.9,34.3 216.5,37.4 204.1,39.9 C 191.7,42.4 189.7,45.1 185.5,48.2 C 181.3,51.3 186.3,54.1 179.0,58.4 C 171.7,62.7 146.7,62.0 141.9,74.2 C 137.1,86.4 152.6,121.8 150.3,131.7 C 148.0,141.6 134.0,132.0 128.0,133.6 C 122.0,135.2 116.9,136.8 114.1,141.0 C 111.3,145.2 113.6,150.0 109.0,153.8 C 104.4,157.6 96.0,153.0 91.0,156.0 C 86.0,159.0 86.5,166.5 82.0,170.0 C 77.5,173.5 70.0,170.0 64.0,174.0 C 58.0,178.0 58.0,186.0 52.0,190.0 C 46.0,194.0 38.0,192.0 32.0,197.0 C 26.0,202.0 24.0,209.0 19.0,214.0 C 14.0,219.0 6.0,222.0 2.0,228.0 C -2.0,234.0 1.0,242.0 5.0,247.0 C 60.0,300.0 140.0,375.0 210.0,438.0 C 215.0,442.0 218.0,448.0 219.0,455.0 C 220.0,462.0 217.0,470.0 222.0,476.0 C 227.0,482.0 238.0,481.0 244.0,477.0 C 250.0,473.0 251.0,464.0 257.0,460.0 C 263.0,456.0 272.0,458.0 278.0,453.0 C 284.0,448.0 284.0,439.0 290.0,434.0 C 296.0,429.0 306.0,431.0 312.0,425.0 C 318.0,419.0 315.0,409.0 322.0,404.0 C 360.0,377.0 395.0,355.0 408.0,346.0 C 412.0,343.0 410.0,335.0 405.0,331.0 C 400.0,327.0 392.0,329.0 388.0,323.0 C 384.0,317.0 388.0,308.0 386.0,300.0 C 384.0,292.0 379.0,286.0 378.0,277.0 C 377.0,268.0 380.0,258.0 379.0,247.0 C 378.0,236.0 372.0,228.0 369.0,217.0 C 366.0,206.0 369.0,193.0 363.0,182.0 C 357.0,171.0 343.0,166.0 336.0,156.0 C 329.0,146.0 327.0,134.0 327.0,123.0 C 327.0,117.0 333.0,113.0 335.0,107.0 C 337.0,101.0 335.0,93.0 339.0,87.0 C 343.0,81.0 348.0,38.0 334.9,34.3 Z";

export default function AlgeriaMap({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  // idle -> loop (2x draw/erase) -> final (3rd draw, stays drawn) -> done
  const [phase, setPhase] = useState<"idle" | "loop" | "final" | "done">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("loop");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAnimationEnd = () => {
    if (phase === "loop") setPhase("final");
    else if (phase === "final") setPhase("done");
  };

  const animation =
    phase === "loop" ? "draw-loop 3s ease-in-out 2" :
    phase === "final" ? "draw-final 1.5s ease-in-out 1 forwards" :
    "none";

  return (
    <svg ref={ref} viewBox="0 0 413 500" className={className} fill="none" aria-hidden="true"
      style={{ "--path-length": PATH_LENGTH } as React.CSSProperties}>
      <path d={ALGERIA_PATH} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        onAnimationEnd={handleAnimationEnd}
        style={{
          strokeDasharray: PATH_LENGTH,
          strokeDashoffset: phase === "idle" ? PATH_LENGTH : phase === "done" ? 0 : undefined,
          animation,
        }}
      />
    </svg>
  );
}
