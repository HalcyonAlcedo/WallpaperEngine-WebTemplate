import axios from 'axios'

const config = {
    layer: {
        background: {
            file: 'bg',
            type: 'png',
            parallax: 0.1,
            class: {},
            src: false
        }
    },
    common: {
        Season: {
            spring: {
                label: 'spring',
                months: {
                    start: 4,
                    end: 6
                }
            },
            autumn: {
                label: 'autumn',
                months: {
                    start: 10,
                    end: 11
                }
            },
            summer: {
                label: 'summer',
                months: {
                    start: 7,
                    end: 9
                }
            },
            winter: {
                label: 'winter',
                months: {
                    start: 12,
                    end: 3
                }
            }
        },
        periods: {
            day: {
                label: 'day',
                benchmarks: 'sunrise',
                deviation: 0
            },
            dusk: {
                label: 'evening',
                benchmarks: 'sunset',
                deviation: 30
            },
            night: {
                label: 'night',
                benchmarks: 'sunset',
                deviation: 0
            }
        },
        effect: {
            clock: {
                parallax: false
            },
            particle: {
                display: true
            }
        }
    }
}

const state = {
    wallpaperconfig: config,
    configload: false
}

const mutations = {
    INIT_DATA(state, data) {
        state.wallpaperconfig = data
    },
    LOAD_CONFIG(state) {
        state.configload = true
    }
}

const actions = {
    initialdata({ commit }) {
        return axios.get('./static/config.json')
    },
    setconfigdata({ dispatch, commit }) {
        return dispatch('initialdata').then((response) => {
            let getAllJson = function(jsons, jsonc) {
                for (let jsonkey in jsons) {
                    if (!(jsons[jsonkey] instanceof Object)) {
                        if (jsonc === undefined)
                            jsonc = jsons
                        jsonc[jsonkey] = jsons[jsonkey]
                    } else {
                        getAllJson(jsons[jsonkey], jsonc[jsonkey])
                    }
                }
                return jsons
            }
            commit('INIT_DATA', getAllJson(response.data, state.wallpaperconfig))
            commit('LOAD_CONFIG')
        })
    }
}

const getters = {
    donewallpaperconfig: state => state.wallpaperconfig,
    doneconfigload: state => state.configload
}

export default {
    state,
    mutations,
    actions,
    getters
}