import { transform } from "next/dist/build/swc"
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-base': 'linear-gradient(100deg, var( --color-secondary) -5.85%, var(--color-primary) 109.55%))',
        'back1': "url('/wallpapers/mac_1.jpg')",
      },
      colors: {
        border: "hex(var(--border))",
        input: "hex(var(--input))",
        ring: "hex(var(--ring))",
        background: "hex(var(--background))",
        foreground: "hex(var(--foreground))",
        primary: {
          DEFAULT: "hex(var(--primary))",
          foreground: "hex(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hex(var(--secondary))",
          foreground: "hex(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hex(var(--destructive))",
          foreground: "hex(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hex(var(--muted))",
          foreground: "hex(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hex(var(--accent))",
          foreground: "hex(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hex(var(--popover))",
          foreground: "hex(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hex(var(--card))",
          foreground: "hex(var(--card-foreground))",
        },
        window:{ 
          exit: 'hex()'
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bouncing": {
          '50%': { transform: 'translateY(0) '},
          '0%': { transform: 'translateY(-30px) ' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bouncing": 'bouncing 1s',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config