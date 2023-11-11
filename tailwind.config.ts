import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'radiance': '0 0 30px 10px rgba(252, 211, 77, 0.7)',
      },
      colors: {
        // Light Mode Gradient
        'day-sky-common': '#CDDDEE',
        'day-sky-mid': '#BCCEDD',

        // Dark Mode Gradient
        'night-sky-common': '#20232A',
        'night-sky-mid': '#33363D',
      },
    },
  },
  plugins: [],
};

export default config
