const primaryColor = "var(--main-bg-color)";
const notificationBarColor = "var(--notification-bg-color)";
const layoutBgColor = "var(--layout-bg-color)";
const notificationBarFontColor = "var(--notification-font-color)";
const headerFooterFontColor = "var(--header-footer-font-color)";
const secondaryColor = "#0288d1";
const max = "1200px";
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  daisyui: {
    themes: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/aspect-ratio"),
    require("./utils/tailwind-safe-area.js"),
    require("daisyui"),
  ],
  theme: {
    screens: {
      "300-up": "300px",
      "400-up": "400px",
      xs: "475px",
      "960-up": "960px",
      // => @media (min-width: 900px) { ... }

      ...defaultTheme.screens,
    },
    fontFamily: {
      // display: "var(--display-font)",
      body: ["var(--display-font)", "sans-serif"],
      // body: ["Roboto", "Helvetica", "Arial"].join(",") + " sans-serif",
      // sans: ["Roboto", "DM-Sans", "sans-serif"].join(",") + "sans-serif",
    },
    extend: {
      fontFamily: {
        playFair: ["Playfair Display", "sans-serif"],
        geist: ["Geist", "sans-serif"],
      },
      maxWidth: {
        1200: max,
      },
      width: {
        1200: max,
      },
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        notificationBarColor: notificationBarColor,
        notificationBarFontColor: notificationBarFontColor,
        headerFooterFontColor: headerFooterFontColor,
        layoutBgColor,
        grey: {
          100: "#f5f6f9",
          300: "#00000029",
          400: "#d1d5db",
          500: "#636363",
          700: "rgb(55 65 81)",
          800: "rgb(31 41 55)",
        },
        orange: {
          500: "#F66B00",
        },
        red: {
          primary: "#F12627",
        },
        green: {
          primary: "#27B045",
          alert: "#4caf50",
        },
        custom: {
          black: "#191919",
        },
        locator: {
          primary: "#F5F6F9",
          secondary: "#008CDC",
        },
        // red: '#E74C3C',
        // blue: '#0A2540',
        // white: '#fff',
      },
      boxShadow: {
        alert:
          "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
        button:
          "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        "button-hover":
          "1px 3px 8px 1px rgb(0 0 0 / 15%), 0px 2px 4px 0px rgb(0 0 0 / 14%), 0px 1px 4px 0px rgb(0 0 0 / 10%)",
        paper:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      },
      spacing: {
        "site-padding": "1.5rem",
      },
    },
  },
};
