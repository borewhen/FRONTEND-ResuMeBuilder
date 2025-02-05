import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        dip: {
          20: "#F5F3EF",
          40: "#E5E0D5",
          60: "#D1CAB9",
          80: "#C0AC8F",
          100: "#877459",
          blk: "#171717"
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
