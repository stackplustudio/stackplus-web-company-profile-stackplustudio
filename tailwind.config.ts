import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Satu-satunya font situs: Plus Jakarta Sans (variabel --font-sans diset di layout.tsx)
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      // Design tokens StackPlus. Biru #0053F1 tetap menjadi warna utama brand.
      colors: {
        primary: {
          DEFAULT: "#0053F1", // Biru elektrik StackPlus
          dark: "#003CB3", // Hover dan fokus tombol utama
        },
        secondary: "#FCFBF6",
        background: "#FCFBF6", // Latar situs
        surface: "#FDFBF7", // Latar kartu
        "surface-alt": "#F6F3EC", // Latar section selang-seling
        line: "#EAE5D9", // Border kartu dan pemisah
        ink: {
          DEFAULT: "#423E3A", // Teks utama dan tombol sekunder
          dark: "#2A2724", // Hover tombol sekunder
        },
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-x-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "marquee-x": "marquee-x 40s linear infinite",
        "marquee-x-reverse": "marquee-x-reverse 40s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    // Menyediakan kelas animate-in, fade-in, slide-in-from-*, zoom-in yang dipakai di banyak komponen
    animate,
    // Utility yang sebelumnya dipakai tetapi belum pernah didefinisikan
    plugin(({ addUtilities, addComponents }) => {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
      addComponents({
        ".card-hover": {
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 16px 32px -12px rgb(0 83 241 / 0.2)",
            borderColor: "rgb(0 83 241 / 0.3)",
          },
        },
      });
    }),
  ],
};
export default config;
