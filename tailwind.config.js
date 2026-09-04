/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          offwhite: "#F8FAFC",
          light: "#F1F5F9",
          yellow: "#F5C400",
          yellowGlow: "#FFE042",
          yellowDark: "#D4A100",
          navy: "#0A1128",
          navyDark: "#060B1A",
          navySurface: "#0E1B38",
          navyCard: "#132247",
          navyCardHover: "#1A2E5C",
          navyBorder: "rgba(10, 17, 40, 0.12)",
          black: "#060B1A", // Dark navy black
          dark: "#0A1128",
          surface: "#0E1B38",
          card: "#132247",
          cardHover: "#1A2E5C",
          border: "rgba(10, 17, 40, 0.10)",
          borderLight: "rgba(255, 255, 255, 0.15)",
          borderGold: "rgba(245, 196, 0, 0.35)",
          cream: "#0A1128", // High-contrast dark navy default
          creamMuted: "#334155",
          muted: "#64748B",
          charcoal: "#0A1128",
          slate: "#334155",
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Cinzel", "Playfair Display", "serif"],
        display: ["Cinzel", "Cormorant Garamond", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        heading: ["Syne", "Plus Jakarta Sans", "sans-serif"],
      },
      letterSpacing: {
        widest: ".25em",
        cinema: ".35em",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        }
      }
    },
  },
  plugins: [],
}
