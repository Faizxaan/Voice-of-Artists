"use client";

import { useEffect } from 'react';

/**
 * Hook to handle scroll to hash on page load or hash change
 * Ensures proper alignment with fixed header
 */
export const useScrollToHash = () => {
  useEffect(() => {
    const scrollToHash = () => {
      // Get hash from URL
      const hash = window.location.hash;
      
      if (!hash) return;
      
      // Remove the # to get the element ID
      const targetId = hash.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (!targetElement) return;
      
      // Get header height from CSS variable or calculate it
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')
          .replace('px', '')
      ) || 64;
      
      // Calculate position
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      // Scroll to position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };
    
    // Wait for DOM to be ready and images/content to load
    if (document.readyState === 'complete') {
      // Already loaded
      setTimeout(scrollToHash, 100);
    } else {
      // Wait for load event
      window.addEventListener('load', () => {
        setTimeout(scrollToHash, 100);
      });
    }
    
    // Also handle hash changes while on the page
    window.addEventListener('hashchange', scrollToHash);
    
    return () => {
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);
};
