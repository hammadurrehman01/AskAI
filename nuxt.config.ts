// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  ssr:false,

  app: {

      head: {
         title: '聊天学习交流 - 免费AI问答',
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },

          ],
          link: [
              { rel: "icon", href: "/favicon.ico", type: 'image/x-icon'},
          ],
          script: [
              { src: 'https://cdn.dingxiang-inc.com/ctu-group/captcha-ui/v5/index.js', crossorigin: 'anonymous', id: "dx-captcha-script" },
              { src: '/config.js' }

          ],
      },
      pageTransition: { name: 'page', mode: 'out-in' }

  },
  css: [
      '~/assets/css/style.min.css',
      '~/assets/css/main.css',
      '~/assets/css/dark.css',
      '~/assets/css/mobile.css'

  ],

  modules: [
      '@nuxt/devtools',
      '@pinia/nuxt',
      '@nuxt/ui',
      '@nuxtjs/color-mode',
      '@pinia-plugin-persistedstate/nuxt',
      'nuxt-icon'
  ],

  devtools: {
      // Enable devtools (default: true)
      enabled: false,
  },

  runtimeConfig: { // 运行时常量
      public: { // 客户端-服务的都能访问
          baseUrl: process.env.VITE_SERVER_NAME
      }
  },

  routeRules: {
      '/ai_chat': { ssr: false },
      '/editor/**': { ssr: false },
      '/mark_me': { ssr: false },
  },

  compatibilityDate: '2024-08-15',
})