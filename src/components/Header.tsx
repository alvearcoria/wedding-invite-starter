"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Heart } from "./icons/Heart";


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Start showing the header after scrolling past the hero section (e.g., > 90% of viewport height)
      setIsScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
       <div className="bg-background/80 shadow-md backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
            <Heart className="h-6 w-6" />
            <span>{siteConfig.couple.her} & {siteConfig.couple.him}</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary/80"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Alternar menú</span>
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 pb-4">
            <nav className="flex flex-col items-center gap-4">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild onClick={() => setIsMenuOpen(false)}>
                <Link href="#rsvp">Confirmar Asistencia</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
