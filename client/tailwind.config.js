/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7BEA18",
        secondary: "#5ea918",
        accent: "#4f8f16",
        dark: "#020617",
        muted: "#64748b",
        light: "#f8fafc"
      },
      boxShadow: {
        glow: "0 20px 50px rgba(123, 234, 24, 0.22)",
        card: "0 16px 40px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(123,234,24,0.28), transparent 30%), radial-gradient(circle at 80% 0%, rgba(94,169,24,0.26), transparent 25%), linear-gradient(135deg, #132500 0%, #355f10 45%, #7BEA18 100%)"
      }
    }
  },
  plugins: []
};
