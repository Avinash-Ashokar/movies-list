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
        primary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['64px', { lineHeight: '80px', letterSpacing: '0%' }],
        'heading-2': ['48px', { lineHeight: '56px', letterSpacing: '0%' }],
        'heading-3': ['32px', { lineHeight: '40px', letterSpacing: '0%' }],
        'heading-4': ['24px', { lineHeight: '32px', letterSpacing: '0%' }],
        'heading-5': ['20px', { lineHeight: '24px', letterSpacing: '0%' }],
        'heading-6': ['16px', { lineHeight: '24px', letterSpacing: '0%' }],
        'body-large': ['20px', { lineHeight: '32px', letterSpacing: '0%' }],
        'body-regular': ['16px', { lineHeight: '24px', letterSpacing: '0%' }],
        'body-small': ['14px', { lineHeight: '24px', letterSpacing: '0%' }],
        'body-xs': ['12px', { lineHeight: '24px', letterSpacing: '0%' }],
        'caption': ['14px', { lineHeight: '16px', letterSpacing: '0%' }],
      },
      fontWeight: {
        regular: '400',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '2': '2px',
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '120': '120px',
        '160': '160px',
      },
    },
  },
  plugins: [],
} satisfies Config;
