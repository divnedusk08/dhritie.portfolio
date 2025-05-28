
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Award, Briefcase, Mail, Home } from "lucide-react"; // Added Home icon
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const navItems = [
  { href: "/#about", label: "About Me", icon: User, sectionId: "about" },
  { href: "/#achievements", label: "Achievements", icon: Award, sectionId: "achievements" },
  { href: "/#projects", label: "Projects", icon: Briefcase, sectionId: "projects" },
  { href: "/#contact", label: "Contact", icon: Mail, sectionId: "contact" },
];

export function Header() {
  const pathname = usePathname(); // Will be '/' for the single page app
  const [currentHash, setCurrentHash] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', updateHash, false);
    updateHash(); // Set initial hash

    // Set initial hash on load for IntersectionObserver alternative
    if (typeof window !== "undefined") {
        setCurrentHash(window.location.hash || '#about'); // Default to #about if no hash
    }

    return () => {
      window.removeEventListener('hashchange', updateHash, false);
    };
  }, []);

  const NavLink = ({ href, label, icon: Icon, sectionId }: { href: string; label: string; icon: React.ElementType, sectionId: string }) => {
    const isActive = currentHash === `#${sectionId}` || (sectionId === 'about' && currentHash === '');
    
    const handleClick = () => {
        setIsSheetOpen(false); // Close sheet on link click
        // Next Link with hash should handle scrolling
    };

    return (
      <Link href={href} passHref onClick={handleClick}>
        <Button
          variant="ghost"
          className={cn(
            "justify-start text-base font-medium hover:bg-accent/10 w-full",
            isActive
              ? "text-foreground font-semibold"
              : "text-foreground/80 hover:text-foreground"
          )}
        >
          <Icon className="mr-2 h-5 w-5" />
          {label}
        </Button>
      </Link>
    );
  };
  
  const DesktopNavLink = ({ href, label, sectionId }: { href: string; label: string; sectionId: string }) => {
    const isActive = currentHash === `#${sectionId}` || (sectionId === 'about' && currentHash === '');
    return (
       <Link href={href} passHref>
         <Button
          variant="ghost"
          className={cn(
            "text-sm font-medium",
            isActive
              ? "text-foreground font-semibold hover:text-foreground/90"
              : "text-foreground/70 hover:text-foreground"
          )}
        >
          {label}
        </Button>
      </Link>
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/#about" className="flex items-center space-x-2 ml-4" aria-label="Dhriti Home">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <DesktopNavLink key={item.href} href={item.href} label={item.label} sectionId={item.sectionId} />
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6">
              <Link href="/#about" className="mb-6 flex items-center" aria-label="Dhriti Home" onClick={() => setIsSheetOpen(false)}>
                <Logo />
              </Link>
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
