/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F0F0F0",
        primaryMain: "#0056b3",
        primaryEmphasis: "#032d5a",
        primaryDeepEmphasis: "#0071eb",
        secondaryMain: "#3f6d0e",
        secondaryEmphasis: "#193000",
        secondaryDeepEmphasis: "#60bb00",
      },
    },
  },
  plugins: [],
};