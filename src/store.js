import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/api/souls-api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    souls: null
  },

  mutations: {
    set_souls (state, payload) { state.souls = payload }
  },

  actions: {
    async create_soul (context, soul) {
      const id = await api.create_soul(soul)
    },

    async get_souls (context) {
      const souls = await api.get_souls()
      context.commit('set_souls', souls)
    },

    async get_soul_by_id (context, id) {
      const soul = await api.get_soul_by_id(id)
      context.commit('set_souls', [soul])
    },

    async get_souls_by_field (context, payload) {
      const souls = await api.get_souls_by_field(payload.field, payload.value)
      context.commit('set_souls', souls)
    },

    async update_soul (context, payload) {
      await api.update_soul(payload.id, payload.data)
    },

    async delete_soul (context, id) {
      await api.delete_soul(id)
    }
  },

  getters: {
    souls (state) { return state.souls }
  }
})
