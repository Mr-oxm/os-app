import { transform } from "next/dist/build/swc"
import type { Config } from "tailwindcss"

const config = {
  darkMode: [
    "class", 'dark'
  ],
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
      cursor: {
        'macos': 'url("/cursor/mac.png"), auto',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-base': 'linear-gradient(100deg, var( --color-secondary) -5.85%, var(--color-primary) 109.55%))',
        'back1': "url('/wallpapers/mac_6.jpg')",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        window:{ 
          exit: 'hsl(var(--windowExit))',
          mini: 'hsl(var(--windowMinimize))',
          max: 'hsl(var(--windowMaximize))',
          foreground: 'hsl(var(--windowForeground))',
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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bouncing": 'bouncing 1s',
        fadeIn: 'fadeIn 0.5s ease-out',
        fadeOut: 'fadeOut 0.5s ease-out',
        slideDown: 'slideDown 0.5s ease-out',
      },
      fontFamily: {
        'style-script': ['"Style Script"', 'cursive'],
        'six-caps': ['""', 'cursive'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config