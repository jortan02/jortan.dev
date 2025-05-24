import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fade-in 1s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "50%": {
            opacity: "50%",
          },
          "100%": {
            opacity: "100%",
          },
        },
      },
    },
  },
  plugins: [typography],
};
export default config;
