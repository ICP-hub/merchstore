/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 1s ease-in-out",
        marquee: "marquee 15s linear infinite",
      },
      keyframes: {
        fadeOut: {
          "0%": {
            backgroundColor: "rgba(249, 250, 251, var(--tw-bg-opacity))",
          },
          "100%": { backgroundColor: "rgba(255, 255, 255, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-120%)" },
        },
      },
    },
  },
  plugins: [],
}

