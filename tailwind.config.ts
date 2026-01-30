import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#C41E3A',
        'deep-red': '#8B0000',
        'cream': '#FDF5E6',
        'gold': '#D4AF37',
        'charcoal': '#1a1a1a',
        'warm-black': '#0d0d0d',
      },
      fontFamily: {
        'parisienne': ['Parisienne', 'cursive'],
        'playfair': ['Playfair Display', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.2s ease-out',
        'fade-in-up-delay-1': 'fadeInUp 1.2s ease-out 0.2s both',
        'fade-in-up-delay-2': 'fadeInUp 1.2s ease-out 0.4s both',
        'fade-in-up-delay-3': 'fadeInUp 1.2s ease-out 0.6s both',
        'fade-in-up-delay-4': 'fadeInUp 1.2s ease-out 0.8s both',
        'fade-in-up-delay-5': 'fadeInUp 1.2s ease-out 1s both',
        'float': 'float 4s ease-in-out infinite',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.7)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
