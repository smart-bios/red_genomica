
export default {
  
  
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/dna.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: 'red',
  },
  /*
  ** Global CSS
  */
  css: [
    '@assets/css/bootstrap.css',
    //'@assets/css/load.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-blob-json-csv'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
    icons: true // Install the IconsPlugin (in addition to BootStrapVue plugin
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    //baseURL: 'http://192.168.22.26:3000/api'
	   baseURL: 'http://localhost:3000/api'
    //baseURL: 'http://192.168.12.68:3000/api'
    //baseURL: 'http://192.168.0.18:3000/api'

  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
