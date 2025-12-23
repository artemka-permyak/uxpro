import svgLoader from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'UxPRO',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'description', content: 'UxPro — создаём дизайн и проектируем сложные цифровые продукты' },
        { name: 'google-site-verification', content: 'Gi3XVUeVE1iajZmK4RWzziUDv3YzbC8dys2nPpfBR5k' },
        { name: 'yandex-verification', content: '669143fa93eb9342' },
        { name: 'yandex-verification', content: '905c7da07180171d' },

        { key: 'og:title', property: 'og:title', content: 'UxPRO' },
        { key: 'og:description', property: 'og:description', content: 'UxPro — создаём дизайн и проектируем сложные цифровые продукты' },

        { key: 'twitter:title', name: 'twitter:title', content: 'UxPRO' },
        { key: 'twitter:description', name: 'twitter:description', content: 'UxPro — создаём дизайн и проектируем сложные цифровые продукты' },
      ],

      script: [
        {
          key: 'yandex-metrika',
          innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){
            (m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],
            k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(101149185, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });`,
          type: 'text/javascript',
          defer: true,
        }
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/101149185" style="position:absolute; left:-9999px;" alt="" /></div>'
        }
      ]
    }
  },

  css: [
    '@/global/assets/styles/index.css',
  ],

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/content',
  ],

  site: {
    url: process.env.DOMAIN_NAME,
    name: 'UxPRO',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls']
  },

  vite: {
    plugins: [
      svgLoader(),
      tailwindcss(),
    ],
  },

  compatibilityDate: '2024-12-19',

  nitro: {
    preset: 'node-server',
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/services',
        '/contact-us',
        '/policy',
      ],
    },
  },

  routeRules: {
    '/**': { prerender: true },
    '/api/**': { prerender: false },
  },
})
