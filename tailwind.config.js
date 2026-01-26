/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#faf8f5',
          secondary: '#f5f3f0',
          tertiary: '#f0ede8',
        },
        border: {
          light: '#e5e3e0',
          medium: '#d1cfcc',
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          tertiary: '#9ca3af',
        },
        accent: {
          primary: '#3b82f6',
          hover: '#2563eb',
          light: '#dbeafe',
        },
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '10px',
      },
    },
  },
  plugins: [],
}
