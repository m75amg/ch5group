import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "rgb(var(--color-brand-primary) / <alpha-value>)",
          "primary-foreground":
            "rgb(var(--color-brand-primary-foreground) / <alpha-value>)",
          accent: "rgb(var(--color-brand-accent) / <alpha-value>)",
          "accent-foreground":
            "rgb(var(--color-brand-accent-foreground) / <alpha-value>)",
          "accent-hover":
            "rgb(var(--color-brand-accent-hover) / <alpha-value>)",
        },
        neutral: {
          50: "rgb(var(--color-neutral-50) / <alpha-value>)",
          100: "rgb(var(--color-neutral-100) / <alpha-value>)",
          200: "rgb(var(--color-neutral-200) / <alpha-value>)",
          300: "rgb(var(--color-neutral-300) / <alpha-value>)",
          400: "rgb(var(--color-neutral-400) / <alpha-value>)",
          500: "rgb(var(--color-neutral-500) / <alpha-value>)",
          600: "rgb(var(--color-neutral-600) / <alpha-value>)",
          700: "rgb(var(--color-neutral-700) / <alpha-value>)",
          800: "rgb(var(--color-neutral-800) / <alpha-value>)",
          900: "rgb(var(--color-neutral-900) / <alpha-value>)",
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        "background-muted":
          "rgb(var(--color-background-muted) / <alpha-value>)",
        "background-inverse":
          "rgb(var(--color-background-inverse) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        "foreground-muted":
          "rgb(var(--color-foreground-muted) / <alpha-value>)",
        "foreground-inverse":
          "rgb(var(--color-foreground-inverse) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        "border-strong": "rgb(var(--color-border-strong) / <alpha-value>)",
        ring: "rgb(var(--color-ring) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        chart: {
          1: "rgb(var(--color-chart-1) / <alpha-value>)",
          2: "rgb(var(--color-chart-2) / <alpha-value>)",
          3: "rgb(var(--color-chart-3) / <alpha-value>)",
          4: "rgb(var(--color-chart-4) / <alpha-value>)",
          5: "rgb(var(--color-chart-5) / <alpha-value>)",
          grid: "rgb(var(--color-chart-grid) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-1": [
          "4.5rem",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "display-2": [
          "3.5rem",
          {
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        h1: [
          "3rem",
          { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        h2: [
          "2.25rem",
          { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        h3: [
          "1.75rem",
          { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" },
        ],
        h4: ["1.375rem", { lineHeight: "1.35", fontWeight: "600" }],
        h5: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.5", fontWeight: "500" }],
        eyebrow: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "500" },
        ],
        label: ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
        button: ["0.9375rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
        md: "0 4px 12px rgba(15, 23, 42, 0.08)",
        lg: "0 8px 24px rgba(15, 23, 42, 0.10)",
        xl: "0 16px 40px rgba(15, 23, 42, 0.12)",
      },
      height: {
        13: "52px",
        18: "72px",
      },
      minHeight: {
        13: "52px",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      zIndex: {
        base: "0",
        dropdown: "10",
        sticky: "20",
        overlay: "30",
        floating: "40",
        modal: "50",
        toast: "60",
        tooltip: "70",
      },
    },
  },
  plugins: [],
};
export default config;
