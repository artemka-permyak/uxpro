import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Uxpro',
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          content: 'upgrade-insecure-requests',
        }
      ]
    }
  },

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

  compatibilityDate: '2024-12-19',
})
