
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onLoaded: () => void;
  textToShow: string;
}

export function Preloader({ onLoaded, textToShow }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [textIsVisible, setTextIsVisible] = useState(false);

  useEffect(() => {
    // Start text fade-in
    const textTimer = setTimeout(() => {
      setTextIsVisible(true);
    }, 100); // Short delay before text starts appearing

    // Duration for the preloader
    const preloaderDuration = 3000; // Total time for preloader (e.g., 3 seconds)
    
    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);
    }, preloaderDuration - 500); // Start fading out 0.5s before total duration

    const loadedTimer = setTimeout(() => {
      onLoaded();
    }, preloaderDuration);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(visibilityTimer);
      clearTimeout(loadedTimer);
    };
  }, [onLoaded]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-in-out", // Black background
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "transition-all duration-1500 ease-in-out", // Slower, more dramatic reveal
          textIsVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-center text-white select-none"
            style={{ textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.6), 0 0 24px rgba(255,255,255,0.4), 0 0 32px rgba(210,225,255,0.3)' }}>
          {textToShow}
        </h1>
      </div>
    </div>
  );
}
