import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    'normalize.css',
    '@/global/styles/index.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: [
    '@nuxt/image',
    '@pinia/nuxt'
  ],

  image: {
    placeholder: 'blur',
    blur: 30,
  },

  vite: {
    plugins: [
      svgLoader(),
    ],
  },
})
