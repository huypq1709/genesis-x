
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        'surface-hover': 'var(--bg-surface-hover)',
        accent: 'var(--accent)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
      }
    },
  },
  plugins: [],
}
