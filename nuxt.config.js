const isDev = process.env.NODE_ENV === 'development'

export default {
  head: {
    title: 'Profiles Search',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'A simple application that demonstrates responsive real-time filtering of a large list using a virtual list and a web worker',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  modern: !isDev,

  css: ['normalize.css/normalize.css'],

  styleResources: {
    scss: ['@/assets/style/global.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/search-worker/plugin.js', mode: 'client' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    'nuxt-compress',
  ],

  modules: ['nuxt-polyfill', '@nuxtjs/axios'],

  axios: {
    baseURL: process.env.BASE_URL,
  },

  polyfill: {
    features: [
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window,
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-virtual-scroller'],

    hotMiddleware: {
      client: {
        // turn off client overlay when errors are present
        overlay: false,
      },
    },

    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          use: [
            { loader: 'worker-loader' },
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@nuxt/babel-preset-app',
                    {
                      corejs: { version: 3 },
                    },
                  ],
                ],
              },
            },
          ],
          exclude: /(node_modules)/,
        })
      }
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '/',
        component: resolve(__dirname, 'pages/search/_query'),
      })
    },
  },
}
