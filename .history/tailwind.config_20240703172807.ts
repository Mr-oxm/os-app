import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class", "dark"],
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
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-base': 'linear-gradient(100deg, var(--color-secondary) -5.85%, var(--color-primary) 109.55%))',
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
        window: { 
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
          '50%': { transform: 'translateY(0)' },
          '0%': { transform: 'translateY(-30px)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bouncing": 'bouncing 1s',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addBase }) {
      addBase({
        ':root': {
          '--radius': '0.5rem',
        },
        '.light': {
          '--background': '0 0% 100%',
          '--foreground': '0 0% 0%',
          '--card': '0 0% 100%',
          '--card-foreground': '0 0% 0%',
          '--popover': '0 0% 100%',
          '--popover-foreground': '0 0% 0%',
          '--primary': '221 82% 51%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '220 14% 96%',
          '--secondary-foreground': '0 0% 0%',
          '--muted': '220 14% 96%',
          '--muted-foreground': '220 9% 46%',
          '--accent': '220 14% 96%',
          '--accent-foreground': '0 0% 0%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '220 13% 91%',
          '--input': '220 13% 91%',
          '--ring': '221 82% 51%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
          '--radius': '0.5rem',
        },
        '.dark': {
          '--background': '0 0% 9%',
          '--foreground': '0 0% 100%',
          '--card': '0 0% 9%',
          '--card-foreground': '0 0% 100%',
          '--popover': '0 0% 9%',
          '--popover-foreground': '0 0% 100%',
          '--primary': '210 100% 66%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '215 28% 17%',
          '--secondary-foreground': '0 0% 100%',
          '--muted': '215 28% 17%',
          '--muted-foreground': '217 10% 64%',
          '--accent': '215 28% 17%',
          '--accent-foreground': '0 0% 100%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '215 28% 17%',
          '--input': '215 28% 17%',
          '--ring': '210 100% 66%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
        },
        '.windows11-light': {
          '--background': '0 0% 100%',
          '--foreground': '0 0% 0%',
          '--card': '0 0% 100%',
          '--card-foreground': '0 0% 0%',
          '--popover': '0 0% 100%',
          '--popover-foreground': '0 0% 0%',
          '--primary': '207 100% 42%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '0 0% 96%',
          '--secondary-foreground': '0 0% 0%',
          '--muted': '0 0% 96%',
          '--muted-foreground': '0 0% 45%',
          '--accent': '0 0% 96%',
          '--accent-foreground': '0 0% 0%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '0 0% 92%',
          '--input': '0 0% 92%',
          '--ring': '207 100% 42%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
          '--radius': '0.25rem',
        },
        '.windows11-dark': {
          '--background': '0 0% 4%',
          '--foreground': '0 0% 100%',
          '--card': '0 0% 4%',
          '--card-foreground': '0 0% 100%',
          '--popover': '0 0% 4%',
          '--popover-foreground': '0 0% 100%',
          '--primary': '207 100% 50%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '0 0% 9%',
          '--secondary-foreground': '0 0% 100%',
          '--muted': '0 0% 9%',
          '--muted-foreground': '0 0% 63%',
          '--accent': '0 0% 9%',
          '--accent-foreground': '0 0% 100%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '0 0% 15%',
          '--input': '0 0% 15%',
          '--ring': '207 100% 50%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
        },
        '.ubuntu-light': {
          '--background': '24 100% 97%',
          '--foreground': '0 0% 0%',
          '--card': '24 100% 97%',
          '--card-foreground': '0 0% 0%',
          '--popover': '24 100% 97%',
          '--popover-foreground': '0 0% 0%',
          '--primary': '11 100% 50%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '24 100% 93%',
          '--secondary-foreground': '0 0% 0%',
          '--muted': '24 100% 93%',
          '--muted-foreground': '0 0% 45%',
          '--accent': '24 100% 93%',
          '--accent-foreground': '0 0% 0%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '24 100% 90%',
          '--input': '24 100% 90%',
          '--ring': '11 100% 50%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
          '--radius': '0.25rem',
        },
        '.ubuntu-dark': {
          '--background': '0 0% 10%',
          '--foreground': '0 0% 100%',
          '--card': '0 0% 10%',
          '--card-foreground': '0 0% 100%',
          '--popover': '0 0% 10%',
          '--popover-foreground': '0 0% 100%',
          '--primary': '11 100% 50%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '0 0% 15%',
          '--secondary-foreground': '0 0% 100%',
          '--muted': '0 0% 15%',
          '--muted-foreground': '0 0% 63%',
          '--accent': '0 0% 15%',
          '--accent-foreground': '0 0% 100%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '0 0% 20%',
          '--input': '0 0% 20%',
          '--ring': '11 100% 50%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
        },
        '.elementary-light': {
          '--background': '200 18% 97%',
          '--foreground': '200 18% 10%',
          '--card': '200 18% 97%',
          '--card-foreground': '200 18% 10%',
          '--popover': '200 18% 97%',
          '--popover-foreground': '200 18% 10%',
          '--primary': '208 100% 43%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '200 18% 93%',
          '--secondary-foreground': '200 18% 10%',
          '--muted': '200 18% 93%',
          '--muted-foreground': '200 18% 45%',
          '--accent': '200 18% 93%',
          '--accent-foreground': '200 18% 10%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '200 18% 90%',
          '--input': '200 18% 90%',
          '--ring': '208 100% 43%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
          '--radius': '0.25rem',
        },
        '.elementary-dark': {
          '--background': '200 18% 10%',
          '--foreground': '200 18% 97%',
          '--card': '200 18% 10%',
          '--card-foreground': '200 18% 97%',
          '--popover': '200 18% 10%',
          '--popover-foreground': '200 18% 97%',
          '--primary': '208 100% 50%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '200 18% 15%',
          '--secondary-foreground': '200 18% 97%',
          '--muted': '200 18% 15%',
          '--muted-foreground': '200 18% 63%',
          '--accent': '200 18% 15%',
          '--accent-foreground': '200 18% 97%',
          '--destructive': '0 84% 60%',
          '--destructive-foreground': '0 0% 100%',
          '--border': '200 18% 20%',
          '--input': '200 18% 20%',
          '--ring': '208 100% 50%',
          '--windowExit': '0 84% 60%',
          '--windowMinimize': '48 96% 53%',
          '--windowMaximize': '120 94% 38%',
          '--windowForeground': '0 0% 100%',
        },
        