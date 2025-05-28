
"use client";

import { useRouter } from "next/navigation";
import type { NextRouter } from "next/router"; // Correct import for NextRouter type if needed, though usually useRouter from next/navigation is sufficient
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { User, Award, Briefcase, Mail, BookOpen } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface MagicalBookPreloaderProps {
  onNavigation: (href: string) => void;
  navItems: NavItem[];
}

// Simple Sparkle Component
const Sparkle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="book-sparkle" style={style} />
);

export function MagicalBookPreloader({ onNavigation, navItems }: MagicalBookPreloaderProps) {
  const router = useRouter(); // Correct: from 'next/navigation' for App Router
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [sparkles, setSparkles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Generate some random positions for sparkles around the book
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 10 }).map(() => ({
        top: `${Math.random() * 100 - 10}%`, // Allow some to be outside the direct book area
        left: `${Math.random() * 100 - 10}%`,
        animationDelay: `${Math.random() * 2}s`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`,
      }));
      setSparkles(newSparkles);
    };
    generateSparkles();
    const intervalId = setInterval(generateSparkles, 3000); // Regenerate sparkles periodically
    return () => clearInterval(intervalId);
  }, []);

  const handleBookClick = () => {
    if (!isBookOpen && !isAnimatingOut) {
      setIsBookOpen(true);
    }
  };

  const handleLinkClick = (href: string) => {
    if (isAnimatingOut) return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      onNavigation(href); // This will hide the preloader and trigger router.push if href is not '/'
    }, 700); // Match animation duration
  };

  return (
    <div
      className={cn(
        "magical-book-preloader fixed inset-0 z-[100] flex items-center justify-center bg-slate-900 transition-opacity duration-700",
        isAnimatingOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div
        className={cn(
          "book-container group",
          isBookOpen ? "book-is-open" : ""
        )}
        onClick={handleBookClick}
      >
        <div className={cn("book", isAnimatingOut ? "book-zoom-out-animation" : "")}>
          {/* Sparkles around the book */}
          {!isAnimatingOut && sparkles.map((style, i) => <Sparkle key={i} style={style} />)}

          <div className="book-cover">
            <div className="book-cover-content">
              <BookOpen className="h-16 w-16 text-yellow-300/80 group-hover:text-yellow-200 transition-colors duration-300" />
              <p className="mt-2 text-sm text-yellow-200/70 group-hover:text-yellow-100 transition-colors duration-300">
                {isBookOpen ? "Choose your path..." : "Click to open"}
              </p>
            </div>
          </div>
          <div className="book-pages-container">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent book click when link is clicked
                  handleLinkClick(item.href);
                }}
                className="book-page-link group/link"
                disabled={isAnimatingOut}
              >
                <item.icon className="mr-3 h-5 w-5 text-primary group-hover/link:text-accent transition-colors" />
                <span className="group-hover/link:text-accent transition-colors">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
