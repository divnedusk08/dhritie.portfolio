
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
    }, 200); // Delay before text starts appearing

    // Duration for the preloader
    const preloaderDuration = 2500; // Total time for preloader (e.g., 2.5 seconds)
    
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
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out", // Use theme background
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "transition-all duration-1000 ease-out", // Smoother, slightly longer transition for text
          textIsVisible ? "opacity-100 scale-100" : "opacity-0 scale-95" // Start slightly smaller and scale up
        )}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-center text-primary select-none"> {/* Use primary text color */}
          {textToShow}
        </h1>
      </div>
    </div>
  );
}
