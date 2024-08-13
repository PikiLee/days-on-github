/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react'

module.exports = {
  content: {
    relative: true,
    files: ['./{app,components,utils}/**/*.{js,jsx,ts,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#12A150',
            },
          },
        },
      },
    }),
  ],
}
