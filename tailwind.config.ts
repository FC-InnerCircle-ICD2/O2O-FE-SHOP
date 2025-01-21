import type { Config } from "tailwindcss"

const config: Config = {
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
        gray: "#B5B5B5",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
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
          accent: "#000000",
          "accent-foreground": "#FFFFFF",
          border: "#525C69",
          ring: "hsl(var(--sidebar-ring))",
          textLight: "#A3A3A3",
        },
        bodydark1: "#DEE4EE",
        bodydark2: "#8A99AF",
        graydark: "#333A48",
        boxdark: "#242e3f",
        textLight: "#99B2C6",
        operational: {
          DEFAULT: "#14FFEB", // 밝은 초록색 (영업중)
          foreground: "#FFFFFF",
        },
        closed: {
          DEFAULT: "#FF4A4A", // 빨간색 (영업종료)
          foreground: "#FFFFFF",
        },
      },
      height: {
        header: "80px",
      },
      fontFamily: {
        sans: ["Pretendard Variable", "sans-serif"],
        jua: ["BMJUA", "sans-serif"],
      },  
      backgroundColor: {
        dark: "#1C2434",
      },
      gridTemplateColumns: {
        order: "minmax(250px, 1fr) 150px 200px",
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
}

export default config
