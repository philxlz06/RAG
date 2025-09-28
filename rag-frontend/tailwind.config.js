/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js App Router
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // main background
        surface: "#f9f9f9",    // cards, panels
        border: "#e5e5e5",     // thin dividers
        text: "#111111",       // primary text
        subtle: "#666666",     // secondary text / hints
        accent: "#000000",     // optional accent color
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
