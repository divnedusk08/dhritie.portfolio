
"use client";

import { useRouter } from "next/navigation";
import type { NextRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
// User, Award, Briefcase, Mail are used by navItems prop
// BookOpen icon is no longer used directly here, but kept for potential future use or if navItems changes.
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

const Sparkle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="book-sparkle" style={style} />
);

export function MagicalBookPreloader({ onNavigation, navItems }: MagicalBookPreloaderProps) {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [showPageLinks, setShowPageLinks] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [sparkles, setSparkles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 15 }).map(() => ({ // Increased sparkles for larger book
        top: `${Math.random() * 110 - 5}%`, 
        left: `${Math.random() * 110 - 5}%`,
        animationDelay: `${Math.random() * 2.5}s`,
        transform: `scale(${Math.random() * 0.6 + 0.4})`,
      }));
      setSparkles(newSparkles);
    };
    generateSparkles();
    const intervalId = setInterval(generateSparkles, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isBookOpen && !showPageLinks) {
      // Delay showing links to allow cover animation and simulate page "filling"
      const timer = setTimeout(() => {
        setShowPageLinks(true);
      }, 800); // Corresponds to book-cover transition duration
      return () => clearTimeout(timer);
    }
  }, [isBookOpen, showPageLinks]);

  const handleBookClick = () => {
    if (!isBookOpen && !isAnimatingOut) {
      setIsBookOpen(true);
    }
  };

  const handleLinkClick = (href: string) => {
    if (isAnimatingOut) return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      onNavigation(href);
    }, 700); // Match book-zoom-out-animation duration
  };

  return (
    <div
      className={cn(
        "magical-book-preloader fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700",
        isAnimatingOut ? "opacity-0 pointer-events-none" : "opacity-100"
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
          {!isAnimatingOut && sparkles.map((style, i) => <Sparkle key={i} style={style} />)}

          <div className="book-cover">
             <Image
                src="https://placehold.co/800x600.png" // Larger base image for better quality on larger display
                alt="The Spellbook of Dhriti Erusalagandi"
                layout="fill"
                objectFit="cover"
                className="pointer-events-none" // Prevents image from interfering with click
                data-ai-hint="3D book ancient spellbook" // Updated hint
                priority // Preload the cover image
              />
            <div className="book-cover-content">
              <h1 className="book-title-text">
                The Spellbook of Dhriti Erusalagandi
              </h1>
              {/* Removed blinking "click here" prompt from cover */}
            </div>
          </div>

          <div className="book-pages-container">
            {showPageLinks && navItems.map((item) => (
              <button
                key={item.href}
                onClick={(e) => {
                  e.stopPropagation(); 
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
