/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d66f9f",
        secondary: "#c45a8d",
        accent: "#a94672",
        dark: "#020617",
        muted: "#64748b",
        light: "#f8fafc"
      },
      boxShadow: {
        glow: "0 20px 50px rgba(196, 90, 141, 0.20)",
        card: "0 16px 40px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(214,111,159,0.22), transparent 30%), radial-gradient(circle at 80% 0%, rgba(196,90,141,0.20), transparent 25%), linear-gradient(135deg, #4b1831 0%, #8f355f 45%, #d66f9f 100%)"
      }
    }
  },
  plugins: []
};

