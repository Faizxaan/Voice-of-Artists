"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Update CSS custom property with actual header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    // Update on mount and resize
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  // Update header height when mobile menu toggles
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }, [isMobileMenuOpen]);

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
  }, []);

  const navItems = [
    { name: "About", href: "#about-us" },
    { name: "Episodes", href: "#episodes" },
    { name: "Artists Around World", href: "#artists-around-the-world" },
    { name: "Articles", href: "/article" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      // Close mobile menu first
      setIsMobileMenuOpen(false);
      
      // If we're not on the homepage, navigate there first
      if (pathname !== '/') {
        router.push('/' + href);
        return;
      }
      
      // We're on homepage, scroll to section
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        
        if (targetElement && headerRef.current) {
          // Get actual header height dynamically
          const headerHeight = headerRef.current.offsetHeight;
          
          // Get target element position
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm border-b-2 border-black shadow-lg" 
          : "bg-white/90 backdrop-blur-sm"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="logo flex-shrink-0">
            <Image
              src="/images/Voice of Artist Logo-4.png"
              alt="VOA Logo"
              width={200}
              height={67}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-mono text-sm uppercase tracking-wider text-black hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-black pb-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-black hover:text-gray-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-white">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-6 py-3 font-mono text-sm uppercase tracking-wider text-black hover:bg-gray-100 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
