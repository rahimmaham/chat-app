export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chat-client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-typeahead.client',
    '~/plugins/resource',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/auth-module
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/toast
    '@nuxtjs/toast',
    // Doc: https://github.com/lewyuburi/nuxt-validate
    [
      'nuxt-validate',
      {
          lang: 'en',
          /* Avoid Field attribute of vee-valifate to conflict with vue's bootstrap table Field attribute */
          fieldsBagName: 'veeFields',
          /* Vee-Validate occur on event triggers */
          events: '',
      },
  ],
  ],

  /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
     axios: {
      debug: false,
      baseURL: process.env.NUXT_ENV_API_URL,
  },

      /*
     ** Enable auth middleware globally
     ** See https://auth.nuxtjs.org/guide/middleware.html
     */
     router: {
      base: '/',
      middleware: ['authorized'],
  },
  
   /*
    ** Auth module configuration
    ** See https://auth.nuxtjs.org/api/options.html
    */
    auth: {
    plugins: [
        '~/plugins/axios',
        '~/plugins/socket.client',
    ],
    strategies: {
        local: {
            endpoints: {
                login: {
                    url: process.env.NUXT_ENV_API_URL + '/auth/login',
                    method: 'post',
                    propertyName: 'data.accessToken',
                },
                logout: {
                    url: process.env.NUXT_ENV_API_URL + '/auth/logout',
                    method: 'post',
                },
                user: {
                    url: process.env.NUXT_ENV_API_URL + '/user/me',
                    method: 'get',
                    propertyName: 'data',
                },
            },
        },
    },
    localStorage: false,
    cookie: {
        prefix: 'auth.',
        options: {
            domain: process.env.SESSION_DOMAIN,
            path: '/',
            secure: true,
        },
    },
    token: {
        prefix: 'token_',
    },
    redirect: {
        login: '/',
        logout: '/',
        callback: '/',
        home: '/chat',
    },
  },

      /*
     ** Toast configurations
     */
     toast: {
      singleton: true,
      theme: 'bubble',
      position: 'bottom-right',
      duration: 4000,
  },

  /*
     ** Nuxt Validate configurations
     */
     nuxtValidate: {
      lang: 'en',
      events: '',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }

  
}
