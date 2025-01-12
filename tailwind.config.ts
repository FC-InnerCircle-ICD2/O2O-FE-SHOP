import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.5s ease-in-out infinite",
      },
      colors: {
        background: "#F1F4FA",
        foreground: "hsl(var(--foreground))",
        netural: "#FFFFFF",
        grey: "#EFF4FB",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#605CFF",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#FF69B4",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#2FE5A7",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
        },
        border: "#DDDDE8",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "#1D1E21",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "#212428",
          "accent-foreground": "#212428",
          border: "#525C69",
          ring: "hsl(var(--sidebar-ring))",
        },
        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        graydark: "#333A48",
        boxdark: "#242e3f",
        textLight: "#99B2C6",
      },
      height: {
        header: "60px",
      },
      fontFamily: {
        sans: ["Pretendard Variable", "sans-serif"],
        jua: ["BMJUA", "sans-serif"],
      },
      spacing: {
        1: "0.4rem", // 4px
        2: "0.8rem", // 8px
        3: "1.2rem", // 12px
        4: "1.6rem", // 16px
        5: "2rem", // 20px
        6: "2.4rem", // 24px
        7: "2.8rem", // 28px
        8: "3.2rem", // 32px
        9: "3.6rem", // 36px
        10: "4rem", // 40px
        11: "4.4rem", // 44px
        12: "4.8rem", // 48px
        13: "5.2rem", // 52px
        14: "5.6rem", // 56px
        15: "6rem", // 60px
      },
      backgroundColor: {
        dark: "#1C2434",
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
}

export default config
