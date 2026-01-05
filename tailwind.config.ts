import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        aurora: "aurora 15s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          "0%, 100%": {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          "25%": {
            backgroundPosition: "30% 60%, 70% 40%",
          },
          "50%": {
            backgroundPosition: "70% 40%, 30% 60%",
          },
          "75%": {
            backgroundPosition: "40% 70%, 60% 30%",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
