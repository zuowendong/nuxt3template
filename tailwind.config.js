/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        oPPOSansMFont: ["OPPOSans M"],
        oPPOSansRFont: ["OPPOSans R"],
        oPPOSansBFont: ["OPPOSans B"],
      },
      backgroundImage: {},

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",

        laptop: "1440px",
        desktop: "1920px",
      },
    },
  },
  plugins: [require("daisyui")],
};
