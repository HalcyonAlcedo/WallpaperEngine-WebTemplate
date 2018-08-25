const state = {
    Parallax: {
        value: true
    },
    season: {
        value: 'nAuto',
        current: ''
    },
    clock1: {
        value: true
    },
    clock2: {
        value: true
    },
    clockx: {
        max: 100,
        min: 0,
        value: 10
    },
    clocky: {
        max: 100,
        min: 0,
        value: 42
    },
    sunrise: {
        w: 39.540,
        s: 115.240,
        u: 8
    }
}

const mutations = {
    SET_SEASONCURRENT(state, n) {
        state.season.current = n
    },
    SET_SEASON(state, n) {
        state.season.value = n
    },
    SET_PARALLAX(state, n) {
        state.Parallax.value = n
    },
    SET_CLOCK1(state, n) {
        state.clock1.value = n
    },
    SET_CLOCK2(state, n) {
        state.clock2.value = n
    },
    SET_CLOCKX(state, n) {
        state.clockx.value = n
    },
    SET_CLOCKY(state, n) {
        state.clocky.value = n
    },
    SET_SUNRISE(state, n) {
        state.sunrise.w = n.w
        state.sunrise.s = n.s
        state.sunrise.u = n.u
    }
}

const actions = {
    setseasoncurrent({
        commit
    }, val) {
        commit('SET_SEASONCURRENT', val)
    },
    setseason({
        commit
    }, val) {
        commit('SET_SEASON', val)
    },
    setParallax({
        commit
    }, val) {
        commit('SET_PARALLAX', val)
    },
    setclock1({
        commit
    }, val) {
        commit('SET_CLOCK1', val)
    },
    setclock2({
        commit
    }, val) {
        commit('SET_CLOCK2', val)
    },
    setclockx({
        commit
    }, val) {
        commit('SET_CLOCKX', val)
    },
    setclocky({
        commit
    }, val) {
        commit('SET_CLOCKY', val)
    },
    setsunrise({
        commit
    }, val) {
        commit('SET_SUNRISE', val)
    }
}

const getters = {
    doneParallax: state => state.Parallax.value,
    doneseason: state => state.season.value,
    doneseasoncurrent: state => state.season.current,
    doneclock1: state => state.clock1.value,
    doneclock2: state => state.clock2.value,
    doneclockx: state => state.clockx.value,
    doneclocky: state => state.clocky.value,
    donesunrise: state => state.sunrise
}

export default {
    state,
    mutations,
    actions,
    getters
}