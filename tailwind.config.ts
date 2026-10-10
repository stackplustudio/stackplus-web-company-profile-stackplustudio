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
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [
    // Menyediakan kelas animate-in, fade-in, slide-in-from-*, zoom-in yang dipakai di banyak komponen
    animate,
    // Utility yang sebelumnya dipakai tetapi belum pernah didefinisikan
    plugin(({ addUtilities }) => {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
export default config;
