import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    computed: {
        h: 0,
        m: 0,
        s: 0
    }
})

export default store