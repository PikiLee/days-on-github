/** @type {import('tailwindcss').Config} */

import { nextui } from '@nextui-org/react'

module.exports = {
  content: {
    relative: true,
    files: ['./{app,components}/**/*.{js,jsx,ts,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: 'class',
  plugins: [
    nextui(),
  ],
}
