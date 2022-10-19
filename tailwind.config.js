/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "2xl": "1536px"
      },
      fontFamily: {
        "gotham": ["Gotham", "sans-serif"]
      },
      fontWeight: {
        ultra: 1000
      },
      spacing: {
        "2/3": "66.666667%",
        "3/5": "60%",
      },
      colors: {
        primary: {
          brand: "#22d3ee"
        }
      }
    }
  },
  plugins: [],
}
