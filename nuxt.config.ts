import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  css: [
    'normalize.css',
    '@/shared/styles/index.css'
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
    ]
  },
})
