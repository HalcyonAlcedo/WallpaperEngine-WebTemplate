// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Vuex from 'vuex'
import store from './vuex/store'
import particles from 'particles.js'


Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(Vuex)
Vue.use(particles)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})