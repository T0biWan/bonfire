import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/api/corgi-api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    corgis: null
  },

  mutations: {
    setCorgis (state, payload) { state.corgis = payload }
  },

  actions: {
    async createCorgie (context, corgie) {
      const id = await api.createCorgie(corgie)
    },

    async getCorgies (context) {
      const corgis = await api.getCorgis()
      context.commit('setCorgis', corgis)
    },

    async getCorgieById (context, id) {
      const corgi = await api.getCorgieById(id)
      context.commit('setCorgis', [corgi])
    },

    async getCorgiesByField (context, payload) {
      const corgis = await api.getCorgiesByField(payload.field, payload.value)
      context.commit('setCorgis', corgis)
    },

    async updateCorgie (context, payload) {
      await api.updateCorgie(payload.id, payload.data)
    },

    async deleteCorgie (context, id) {
      await api.deleteCorgie(id)
    }
  },

  getters: {
    corgis (state) { return state.corgis }
  }
})
