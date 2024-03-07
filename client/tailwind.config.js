/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        dropDown: "dropDown 0.2s linear",
      },
      keyframes: {
        dropDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
    colors: {
      primary: {
        100: "#e3f2fd",
        200: "#90caf9",
        300: "#42a5f5",
        400: "#0f52ba",
      },
      error: {
        100: "#e57373",
        200: "#e57373",
        300: "#e57373",
      },
      success: {
        100: "#e57373",
        200: "#66bb6a",
        300: "#66bb6a",
      },
      gray: {
        100 : "#6e6e6e"
      }
    },
  },
  plugins: [],
};
