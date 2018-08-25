import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        Parallax: {
            text: '视差',
            type: 'bool',
            value: true
        },
        season: {
            value: 'Auto',
            current: '',
            text: '季节',
            type: 'combo'
        },
        clock1: {
            text: '时间',
            type: 'bool',
            value: true
        },
        clock2: {
            text: '12H/24H',
            type: 'bool',
            value: true
        },
        clockx: {
            max: 100,
            min: 0,
            text: '时间位置(X)',
            type: 'slider',
            value: 10
        },
        clocky: {
            max: 100,
            min: 0,
            text: '时间位置(Y)',
            type: 'slider',
            value: 42
        },
        schemecolor: {
            order: 2,
            text: 'ui_browse_properties_scheme_color',
            type: 'color',
            value: '0 0.5019607843137255 0'
        }
    },
    mutations: {
        setseasoncurrent(season, n) {
            season.current = n
        },
        setseason(season, n) {
            season.value = n
        },
        setParallax(Parallax, n) {
            Parallax.value = n
        },
        setclock1(clock1, n) {
            clock1.value = n
        },
        setclock2(clock2, n) {
            clock2.value = n
        },
        setclockx(clockx, n) {
            clockx.value = n
        },
        setclocky(clocky, n) {
            clocky.value = n
        }
    }
})
export default store