
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onLoaded: () => void;
}

// Simple Wand SVG
const WandIcon = () => (
  <svg
    viewBox="0 0 50 200"
    xmlns="http://www.w3.org/2000/svg"
    className="h-40 w-auto md:h-48 animation-wand-fade-in"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="wandWoodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#8B4513" }} /> {/* SaddleBrown */}
        <stop offset="100%" style={{ stopColor: "#A0522D" }} /> {/* Sienna */}
      </linearGradient>
      <radialGradient id="sparkleGradient">
        <stop offset="0%" stopColor="rgba(255, 255, 220, 1)" />
        <stop offset="70%" stopColor="rgba(253, 224, 71, 0.8)" />
        <stop offset="100%" stopColor="rgba(253, 224, 71, 0)" />
      </radialGradient>
    </defs>
    {/* Wand Stick */}
    <rect x="15" y="0" width="20" height="180" rx="8" fill="url(#wandWoodGradient)" />
    {/* Wand Handle (simple sphere) */}
    <circle cx="25" cy="190" r="10" fill="#654321" /> {/* Darker Brown for handle */}
    {/* Sparkle placeholder - actual animation via CSS */}
    <circle cx="25" cy="10" r="15" className="animation-sparkle-effect" fill="url(#sparkleGradient)" />
  </svg>
);


export function Preloader({ onLoaded }: PreloaderProps) {
  const [animationStage, setAnimationStage] = useState<"initial" | "wandVisible" | "sparkling" | "fadingOut" | "done">("initial");

  useEffect(() => {
    // Sequence the animations
    const t1 = setTimeout(() => setAnimationStage("wandVisible"), 100); // Wand starts appearing
    const t2 = setTimeout(() => setAnimationStage("sparkling"), 600); // Sparkle starts after wand is somewhat visible (500ms animation + 100ms buffer)
    const t3 = setTimeout(() => setAnimationStage("fadingOut"), 2000); // Fade out starts after sparkle (1000ms animation for sparkle + 400ms buffer)
    const t4 = setTimeout(() => {
      setAnimationStage("done");
      onLoaded();
    }, 3000); // Preloader fully gone, content loads (1000ms fadeout)

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onLoaded]);

  if (animationStage === "done") {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black",
        animationStage === "fadingOut" ? "animation-preloader-fade-out" : "opacity-100"
      )}
    >
      {animationStage !== "initial" && animationStage !== "fadingOut" && animationStage !== "done" && (
        <div className="relative">
          <WandIcon />
        </div>
      )}
    </div>
  );
}
