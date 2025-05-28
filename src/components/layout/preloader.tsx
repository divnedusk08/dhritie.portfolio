
"use client";

import { Logo } from "@/components/icons/logo";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onLoaded: () => void;
}

export function Preloader({ onLoaded }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Start logo fade-in
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 100); // Short delay before logo starts appearing

    // Duration for the preloader
    const preloaderDuration = 2500; // Total time for preloader (e.g., 2.5 seconds)
    
    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);
    }, preloaderDuration - 500); // Start fading out 0.5s before total duration

    const loadedTimer = setTimeout(() => {
      onLoaded();
    }, preloaderDuration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(visibilityTimer);
      clearTimeout(loadedTimer);
    };
  }, [onLoaded]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "transition-all duration-1000 ease-in-out",
          logoVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}
      >
        <Logo className="h-12 w-auto text-primary" />
      </div>
      {/* Optional: Add a subtle loading text or spinner */}
      {/* <p className={cn("mt-4 text-sm text-muted-foreground transition-opacity duration-500 ease-in-out", logoVisible ? "opacity-100" : "opacity-0")}>
        Loading...
      </p> */}
    </div>
  );
}
