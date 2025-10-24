/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9edff',
          200: '#bce1ff',
          300: '#90cfff',
          400: '#58b3ff',
          500: '#2a97ff',
          600: '#0a78e7',
          700: '#075fba',
          800: '#094f94',
          900: '#0d4578',
        },
        ink: {
          50: '#f7f8fa',
          100: '#eef1f6',
          200: '#dde3ec',
          300: '#c3cbd8',
          400: '#9aa6b2',
          500: '#6b7785',
          600: '#4f5866',
          700: '#3c4350',
          800: '#2b303b',
          900: '#1f232b',
        },
        success: '#16a34a',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(2, 6, 23, 0.25)',
      },
    },
  },
  plugins: [],
}
