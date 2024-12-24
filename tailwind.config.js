/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './entities/**/*.{js,vue,ts}',
    './features/**/*.{js,vue,ts}',
    './widgets/**/*.{js,vue,ts}',
    './global/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        black: '#090909',
        grey: '#818181',
        darkGrey: '#282828',
      },

      spacing: {
        gap: '3.2rem',
        mbGap: '1.6rem',
      },

      fontFamily: {
        SoyuzGrotesk: ['Soyuz Grotesk', 'sans-serif'],
      },

      screens: {
        mb: { max: '1439px' },
      },

      transitionDuration: {
        DEFAULT: '300ms',
      },
    }
  },
  plugins: []
}
