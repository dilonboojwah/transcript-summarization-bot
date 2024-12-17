/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "Space Grotesk", "sans-serif"], // Default body font
        nasalization: ["Nasalization", "Space Grotesk", "sans-serif"], // Heading font
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: {
          25: "#fafafa",
          50: "#f5f5f6",
          100: "#f0f1f1",
          200: "#ececed",
          300: "#cecfd2",
          400: "#94969c",
          500: "#85888e",
          600: "#61646c",
          700: "#333741",
          800: "#1f242f",
          900: "#161b26",
          950: "#0c111d",
        },
        purple: {
          25: "#f9f0f9",
          50: "#ecd2ed",
          100: "#dfb4e0",
          200: "#d295d4",
          300: "#c577c8",
          400: "#b692f6",
          500: "#a344a6",
          600: "#863788",
          700: "#682b6a",
          800: "#4a1f4b",
          900: "#2d122d",
          950: "#0f060f",
        },
      },
      backgroundImage: {
        "gradient-darker": "linear-gradient(90deg, #2a122a 0%, #b93ca4 100%)",
        "gradient-lighter": "linear-gradient(90deg, #7b337d 0%, #c546B0 100%)",
        "transparent-bg": "url('/src/assets/transparent-background-gradient.svg')",
      },
      borderRadius: {
        full: "100px", // Matches the corner radius of buttons
      },
    },
  },
  plugins: [],
  corePlugins: {
    scrollbarWidth: true, // Enable scrollbar utilities
  },
  variants: {
    extend: {
      scrollbar: ["rounded"], // Optionally add rounded scrollbars if needed
    },
  },
  // Safelist to prevent Tailwind from purging specific dynamic classes
  safelist: [
    "w-[150px]",
    "bg-[#FCFCFD]",
    "border",
    "border-purple-500",
    "text-[#161b26]",
    "font-light",
  ],
};
