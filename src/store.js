import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/api/souls-api'

Vue.use(Vuex)
https://medium.com/js-dojo/structuring-vuex-modules-for-relationships-speed-and-durability-de25f7403643
https://vuejs.org/v2/guide/reactivity.html
https://vuejs.org/v2/guide/list.html#Object-Change-Detection-Caveats
export default new Vuex.Store({
  state: {
    souls: null,
    count: 0,

    all: {},
    active: false,

    new_souls: {},
    active_new_soul: false
  },

  getters: {
    souls (state) { return state.souls },

    new_souls (state) { return state.new_souls },
    new_soulById (state, id) { return state.all[id] || null },
    active_new_soul (state, id) { return state.active ? state.all[state.active] : false }
  },

  mutations: {
    increment (state) { state.count++ },
    set_souls (state, payload) { state.souls = payload },

    set_active_new_soul (state, new_soul_id) { state.active_new_soul = new_soul_id },
    flush_new_souls (state) { state.new_souls = {} },
    add_new_soul (state, {new_soul_id, new_soul}) { Vue.set(state.new_souls, new_soul_id, new_soul) },
    update_new_soul (state, {new_soul_id, new_soul}) { state.new_souls[new_soul_id] = new_soul },
    // remove_new_soul (state, new_soul_id) { delete state.new_souls[new_soul_id] }
  },

  actions: {
    async create_soul (context, soul) {
      const id = await api.create_soul(soul)
      return id
    },

    all({commit}, all){
      for(let album of all)
        commit('add', album)
    },

    async get_souls (context) {
      const souls = await api.get_souls()
      context.commit('set_souls', souls)

      context.commit ('add_new_soul', {'new_soul_id': souls[0].id, 'new_soul': souls[0]})
      context.commit ('add_new_soul', {'new_soul_id': souls[1].id, 'new_soul': souls[1]})
      context.commit ('add_new_soul', {'new_soul_id': souls[2].id, 'new_soul': souls[2]})
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
  }
})
