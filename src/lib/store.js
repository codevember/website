import Vue from 'vue'
import Vuex from 'vuex'
import Api from './Api'
Vue.use(Vuex)

const store = {
  state: {
    count: 0,
    contribs: [],
    year: 2016
  },
  getters: {
    getContribs: state => {
      return state.contribs
    },
    getYear: state => {
      return state.year
    }
  },
  actions: {
    getContributionsOfDay ({commit, state}, args) {
      Api.getContributionsOfDay(args.year, args.day).then(contribs => {
        this.hasContribs = (contribs.length > 0)
        commit('dayContribs', contribs)
      })
    }
  },
  mutations: {
    dayContribs (state, contribs) {
      state.contribs = contribs
    },
    updateYear (state, year) {
      state.year = year
    }
  }
}

export default new Vuex.Store(store)
