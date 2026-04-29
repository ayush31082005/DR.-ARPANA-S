/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f766e",
        secondary: "#0ea5e9",
        accent: "#f97316",
        dark: "#020617",
        muted: "#64748b",
        light: "#f8fafc"
      },
      boxShadow: {
        glow: "0 20px 50px rgba(14, 165, 233, 0.18)",
        card: "0 16px 40px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(14,165,233,0.25), transparent 30%), radial-gradient(circle at 80% 0%, rgba(15,118,110,0.28), transparent 25%), linear-gradient(135deg, #020617 0%, #0f172a 45%, #0f766e 100%)"
      }
    }
  },
  plugins: []
};
