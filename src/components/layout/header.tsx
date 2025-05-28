
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Award, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "About Me", icon: User },
  { href: "/achievements", label: "Achievements", icon: Award },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "justify-start text-base font-medium hover:bg-accent/10",
          pathname === href
            ? "text-foreground font-semibold" // Changed from text-primary
            : "text-foreground/80 hover:text-foreground"
        )}
      >
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" aria-label="Dhriti Erusalagandi Home">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} passHref>
               <Button
                variant="ghost"
                className={cn(
                  "text-sm font-medium",
                  pathname === item.href
                    ? "text-foreground font-semibold hover:text-foreground/90" // Changed from text-primary hover:text-primary
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6">
              <Link href="/" className="mb-6 flex items-center" aria-label="Dhriti Erusalagandi Home">
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
