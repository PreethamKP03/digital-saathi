/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#145BFF',
          blueHover: '#0F48D6',
          blueLight: '#EEF4FF',
          blueSoft: '#DBEAFE',
          navy: '#0B1B3B',
          slate: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(11, 27, 59, 0.08)',
        'blue-glow': '0 12px 32px -8px rgba(20, 91, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
