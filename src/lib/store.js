import Vue from 'vue'
import Vuex from 'vuex'
import Api from 'backend-api/dist/browser.js'
import {getCurrentYear} from './utils.js'
Vue.use(Vuex)

const store = {
  state: {
    count: 0,
    contribs: [],
    year: getCurrentYear(),
    callStatus: false
  },
  getters: {
    getContribs: state => {
      return state.contribs
    },
    getYear: state => {
      return state.year
    },
    getCallStatus: state => {
      return state.callStatus
    }
  },
  actions: {
    getContributionsOfDay ({commit, state}, args) {
      commit('updateCallStatus', true)
      Api.getContributionsOfDay(args.year, args.day).then(contribs => {
        this.hasContribs = (contribs.length > 0)
        commit('dayContribs', contribs)
        commit('updateCallStatus', false)
      })
    }
  },
  mutations: {
    dayContribs (state, contribs) {
      state.contribs = contribs
    },
    updateYear (state, year) {
      state.year = year
    },
    updateCallStatus (state, bool) {
      state.callStatus = bool
    }
  }
}

export default new Vuex.Store(store)
