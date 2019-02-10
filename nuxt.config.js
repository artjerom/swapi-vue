module.exports = {
    plugins: [
      { ssr: false, src: '~plugins/vue-bootstrap' }
    ],
    modules: [
        'bootstrap-vue/nuxt',
        ['bootstrap-vue/nuxt', { css: false }],
    ],
    store: 'vuex-simple-module'
}
