import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    keyframes: {
      stairs: {
        "0%": { transform: "translateX(0) translateY(0)" },
        "100%": { transform: "translateX(40px) translateY(-40px)" },
      },
      bound: {
        "0% 100%": { transform: "translateX(0) translateY(0)" },
        "50%": { transform: "translateX(0) translateY(-40px)" },
      },
    },
    animation: {
      stairs: "stairs 1s linear infinite",
      bound: "bound 1s ease-in-out infinite",
    },
  },
  plugins: [],
};

export default config;
