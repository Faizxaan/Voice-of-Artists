"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Determine if scrolled enough to change appearance
          setIsScrolled(currentScrollY > 50);

          // Hide/show logic with threshold to prevent flickering
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);

          if (scrollDifference > 20) {
            // Only trigger if scroll difference is significant
            if (currentScrollY < 100) {
              // Always show when near top
              setIsVisible(true);
            } else if (currentScrollY < lastScrollY) {
              // Scrolling up - show header
              setIsVisible(true);
            } else if (currentScrollY > lastScrollY + 50) {
              // Scrolling down significantly - hide header
              setIsVisible(false);
            }

            lastScrollY = currentScrollY;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array!

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Episodes", href: "#episodes" },
    { name: "Promo Materials", href: "#promo-materials" },
    { name: "Apply", href: "#apply" },
  ];

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""} ${isVisible ? "show" : "hide"}`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="logo">
            <Image
              src="/images/Voice of Artist Logo-2.png"
              alt="Voice of Artist Logo"
              width={300}
              height={100}
              className="h-24 w-auto filter drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="nav-link">
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="#apply" className="btn btn-primary">
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-neon-lime transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <nav className="py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-6 py-3 nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-6 pt-4">
                <Link
                  href="#apply"
                  className="btn btn-primary w-full text-center block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Apply Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
