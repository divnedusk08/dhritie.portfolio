
"use client";

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
      const newSparkles = Array.from({ length: 25 }).map(() => ({ // Increased sparkles
        top: `${Math.random() * 110 - 5}%`, 
        left: `${Math.random() * 110 - 5}%`,
        animationDelay: `${Math.random() * 3}s`, // Slower, more spread out animation
        transform: `scale(${Math.random() * 0.7 + 0.5})`, // Slightly larger sparkles
      }));
      setSparkles(newSparkles);
    };
    generateSparkles();
    const intervalId = setInterval(generateSparkles, 3500); // Slower refresh
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isBookOpen && !showPageLinks) {
      const timer = setTimeout(() => {
        setShowPageLinks(true);
      }, 800); 
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
    }, 700); 
  };

  return (
    <div
      className={cn(
        "magical-book-preloader fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700",
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
            <div className="book-cover-content">
              <BookOpen className="book-icon h-20 w-20 md:h-28 md:w-28 mb-4 text-primary-foreground/80" />
              <p className="book-prompt-text">
                click here to open
              </p>
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
