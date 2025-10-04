/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // white-10
        input: 'var(--color-input)', // elevated-surface
        ring: 'var(--color-ring)', // netflix-red
        background: 'var(--color-background)', // deep-charcoal
        foreground: 'var(--color-foreground)', // white
        primary: {
          DEFAULT: 'var(--color-primary)', // netflix-red
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // warm-neutral
          foreground: 'var(--color-secondary-foreground)', // off-white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // error-red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // warm-neutral
          foreground: 'var(--color-muted-foreground)', // medium-gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // off-white
          foreground: 'var(--color-accent-foreground)', // deep-charcoal
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // elevated-surface
          foreground: 'var(--color-popover-foreground)', // white
        },
        card: {
          DEFAULT: 'var(--color-card)', // elevated-surface
          foreground: 'var(--color-card-foreground)', // white
        },
        success: {
          DEFAULT: 'var(--color-success)', // fresh-green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber
          foreground: 'var(--color-warning-foreground)', // deep-charcoal
        },
        error: {
          DEFAULT: 'var(--color-error)', // error-red
          foreground: 'var(--color-error-foreground)', // white
        },
        surface: 'var(--color-surface)', // elevated-surface
        'text-primary': 'var(--color-text-primary)', // white
        'text-secondary': 'var(--color-text-secondary)', // medium-gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'elevation-1': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 8px 16px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0 24px 32px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'fade-out': 'fadeOut 200ms ease-out',
        'slide-in': 'slideIn 400ms ease-in-out',
        'slide-out': 'slideOut 400ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
        '300': '300',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}