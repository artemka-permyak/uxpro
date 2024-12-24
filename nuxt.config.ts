import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'UxPRO',
      meta: [
        process.env.NODE_ENV === 'production' ? {
          'http-equiv': 'Content-Security-Policy',
          content: 'upgrade-insecure-requests',
        } : {},

        { name: 'google-site-verification', content: 'Gi3XVUeVE1iajZmK4RWzziUDv3YzbC8dys2nPpfBR5k' },

        { key: 'og:title', property: 'og:title', content: 'UxPRO' },
        { key: 'og:description', property: 'og:description', content: 'UxPRO' },

        { key: 'twitter:title', name: 'twitter:title', content: 'UxPRO' },
        { key: 'twitter:description', name: 'twitter:description', content: 'UxPRO' },
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
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
  ],

  image: {
    placeholder: 'blur',
    blur: 30,
  },

  site: {
    url: process.env.DOMAIN_NAME,
    name: 'UxPRO',
  },

  vite: {
    plugins: [
      svgLoader(),
    ],
  },

  compatibilityDate: '2024-12-19',
})
