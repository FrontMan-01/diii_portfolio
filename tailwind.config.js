/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mist: {
          50: '#F7F8F7',
          100: '#EEF0EE',
          200: '#DFE1DF',
          300: '#CFD0CF',
          400: '#B8BAB8',
          500: '#9EA09E',
          600: '#7B7D7B',
        },
        sunGold: {
          300: '#F6DB85',
          400: '#EFCF6A',
          500: '#E7C456',
          600: '#CEAC3D',
          700: '#AD8D28',
        },
        sunsetOrange: {
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#E27D26',
          700: '#C2410C',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F5EFEB',
          300: '#EDE4DC',
          400: '#DFD3C5',
          500: '#C8B8A6',
        },
        espresso: {
          950: '#141211',
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
          600: '#57534E',
          500: '#78716C',
          400: '#A8A29E',
        },
        gold: {
          300: '#F6DB85',
          400: '#EFCF6A',
          500: '#E7C456',
          600: '#CEAC3D',
          700: '#AD8D28',
        },
        amberGold: {
          light: '#FFFBEB',
          subtle: '#FEF3C7',
          primary: '#E7C456',
          deep: '#CEAC3D',
        },
        warmBorder: 'rgba(28, 25, 23, 0.08)',
        warmBorderStrong: 'rgba(28, 25, 23, 0.15)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Instrument Serif"', '"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Outfit"', 'sans-serif'],
        mono: ['"Space Mono"', '"Geist Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.22em',
        'tightest': '-0.035em',
      },
      boxShadow: {
        'apple-glass': '0 16px 36px -8px rgba(28, 25, 23, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.75) inset, 0 1.5px 2px rgba(255, 255, 255, 0.95) inset, 0 -1px 1px rgba(0, 0, 0, 0.04) inset',
        'apple-pill': '0 8px 24px -4px rgba(28, 25, 23, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.8) inset, 0 1px 1px rgba(255, 255, 255, 0.9) inset',
        'warm-glow': '0 20px 40px -10px rgba(231, 196, 86, 0.28), 0 8px 20px -6px rgba(226, 125, 38, 0.2)',
        'warm-card': '0 15px 35px -5px rgba(28, 25, 23, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 0 0 1px rgba(28, 25, 23, 0.05)',
        'warm-luxury': '0 25px 60px -15px rgba(28, 25, 23, 0.09), 0 0 0 1px rgba(231, 196, 86, 0.3)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-warm': 'pulseWarm 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseWarm: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
