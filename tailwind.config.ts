import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Gradient
        'day-sky-common': '#486D87',
        'day-sky-mid': '#78909C',

        // Dark Mode Gradient
        'night-sky-common': '#20232A',
        'night-sky-mid': '#33363D',
      },
    },
  },
  plugins: [],
};

export default config
