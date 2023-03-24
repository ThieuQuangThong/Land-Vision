/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://i.pinimg.com/564x/6e/8c/73/6e8c734fac3015053de5314d6c4bec9e.jpg')",
        'footer-texture': "url('/img/footer-texture.png')"
    },
  },
  plugins: [],
  }
}
