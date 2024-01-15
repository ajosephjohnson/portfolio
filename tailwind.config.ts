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
        'day-sky-common': '#506D84',
        'day-sky-mid': '#889EAF',

        // Dark Mode Gradient
        'night-sky-common': '#20232A',
        'night-sky-mid': '#33363D',

        // theme colors
        'primary': '#F3D5C0',
        'secondary': '#D4B499',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};

export default config
