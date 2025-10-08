/** @type {import('tailwindcss').Config} */ 
module.exports = { 
  darkMode: 'class', 
  content: [ 
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}", 
  ], 
  theme: { 
    extend: { 
      colors: { 
        primary: "#16a34a", 
        secondary: "#22c55e", 
        dark: "#0f172a", 
        light: "#f8fafc", 
      }, 
    }, 
  }, 
  plugins: [], 
} 
