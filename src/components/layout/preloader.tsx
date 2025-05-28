
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onLoaded: () => void;
  duration?: number;
}

export function Preloader({ onLoaded, duration = 2500 }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Add a slight delay for fade-out animation to complete before calling onLoaded
      setTimeout(onLoaded, 500); // Corresponds to preloader-fade-out duration (0.5s)
    }, duration);

    return () => clearTimeout(timer);
  }, [onLoaded, duration]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!isVisible}
      data-testid="preloader"
    >
      <div className="glowing-orb-container">
        <div className="glowing-orb"></div>
      </div>
    </div>
  );
}
