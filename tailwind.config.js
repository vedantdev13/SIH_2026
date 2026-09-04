/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3378BC',
          hover: '#28639d',
          dark: '#1e4d7b',
          light: '#eef5fc'
        },
        ink: {
          DEFAULT: '#111827',
          light: '#1f2937'
        },
        warm: {
          DEFAULT: '#F2B84B'
        },
        coop: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          500: '#3378BC',
          600: '#28639d',
          700: '#1e4d7b',
          800: '#173c60',
          900: '#111827',
        },
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3378BC',
          600: '#28639d',
          700: '#1e4d7b',
          800: '#173c60',
          900: '#111827',
        }
      }
    },
  },
  plugins: [],
}
