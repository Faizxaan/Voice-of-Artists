import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VOA Brand Colors
        "voa-black": "#000000",
        "voa-white": "#ffffff",
        "voa-gray-100": "#111111",
        "voa-gray-200": "#222222",
        "voa-gray-300": "#333333",
      },
      fontFamily: {
        // Display fonts (chunky, playful)
        display: ["Bangers", "Luckiest Guy", "Fredoka One", "cursive"],
        "display-alt": ["Luckiest Guy", "Bangers", "cursive"],
        // Monospaced body text
        mono: ["Courier Prime", "Roboto Mono", "Space Mono", "monospace"],
        // Script for special notes
        script: ["Dancing Script", "Pacifico", "cursive"],
      },
      fontSize: {
        "display-xl": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-md": ["2rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.8" }],
        "body-md": ["1rem", { lineHeight: "1.8" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      backgroundImage: {
        stars: "url('/assets/backgrounds/stars.png')",
      },
      boxShadow: {
        tape: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        poster:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "episode-card": "0 8px 16px -4px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        parallax: "parallax 20s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        parallax: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(-100px)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
