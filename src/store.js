import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/api/firebase'
import * as soulModel from '@/models/soul'

Vue.use(Vuex)

const souls_module = {
  module: {
    namespaced: true,

    state: {
      souls: {},
      active_soul_id: false
    },

    getters: {
      souls (state) { return state.souls },
      active_soul (state) { return state.active_soul_id ? state.souls[state.active_soul_id] : false }
    },

    mutations: {
      add_soul (state, soul) { Vue.set(state.souls, soul.id, soul) },
      delete_soul (state, soul) { Vue.delete(state.souls, soul.id) },
      set_active_soul (state, soul) { state.active_soul_id = soul.id },
      update_soul (state, soul) { state.souls[soul.id] = soul }
    },

    actions: {
      async get_souls (context) {
        const souls = await souls_module.api.get_souls()
        for (let soul of souls) context.commit('add_soul', soul)
      },

      async new_soul (context) {
        let soul = { author: 'tobi', created: moment().valueOf(), edited: moment().valueOf(), markdown: '' }
        const id = await souls_module.api.create_soul(soul)
        soul = await souls_module.api.get_soul_by_id(id)
        context.commit('add_soul', soul)
        context.commit('set_active_soul', soul)
      },

      async save_soul (context) {
        let soul = context.getters.active_soul
        await souls_module.api.update_soul(soul.id, { markdown: soul.markdown, edited: moment().valueOf() })
        soul = await souls_module.api.get_soul_by_id(soul.id)
        context.commit('update_soul', soul)
      },

      async delete_soul (context) {
        let soul = context.getters.active_soul
        await souls_module.api.delete_soul(soul.id)
        context.commit('delete_soul', soul)
        context.commit('set_active_soul', false)
      }
    }
  },

  api: {
    get_souls: async function () {
      const documents = await firebase.read('souls')
      const souls = documents.map(document => souls_module.parser.instantiateNote(document))
      return souls
    },

    create_soul: async function (soul) {
      const id = await firebase.create('souls', soul)
      return id
    },

    get_soul_by_id: async function (id) {
      const document = await firebase.readById('souls', id)
      const souls = parser.instantiateNote(document)
      return souls
    },

    get_souls_by_field: async function (field, value) {
      const documents = await firebase.readByField('souls', field, value)
      const souls = documents.map(document => parser.instantiateNote(document))
      return souls
    },

    update_soul: async function (id, data) {
      await firebase.update('souls', id, data)
    },

    delete_soul: async function (id) {
      await firebase.remove('souls', id)
    }
  },

  parser: {
    instantiateNote: function (document) {
      const id = document.id
      const name = document.data().name

      return new soulModel.Soul(id, name)
    }
  }
}

export default new Vuex.Store({
  modules: {
    souls: souls_module.module
  }
  // state: {
  //   souls: null,
  //   count: 0,
  //
  //   all: {},
  //   active: false,
  //
  //   new_souls: {},
  //   active_new_soul: false
  // },
  //
  // getters: {
  //   souls (state) { return state.souls },
  //
  //   new_souls (state) { return state.new_souls },
  //   new_soulById (state, id) { return state.all[id] || null },
  //   active_new_soul (state, id) { return state.active ? state.all[state.active] : false }
  // },
  //
  // mutations: {
  //   increment (state) { state.count++ },
  //   set_souls (state, payload) { state.souls = payload },
  //
  //   set_active_new_soul (state, new_soul_id) { state.active_new_soul = new_soul_id },
  //   flush_new_souls (state) { state.new_souls = {} },
  //   add_new_soul (state, {new_soul_id, new_soul}) { Vue.set(state.new_souls, new_soul_id, new_soul) },
  //   update_new_soul (state, {new_soul_id, new_soul}) { state.new_souls[new_soul_id] = new_soul },
  //   // remove_new_soul (state, new_soul_id) { delete state.new_souls[new_soul_id] }
  // },
  //
  // actions: {
  //   async create_soul (context, soul) {
  //     const id = await api.create_soul(soul)
  //     return id
  //   },
  //
  //   all({commit}, all){
  //     for(let album of all)
  //       commit('add', album)
  //   },
  //
  //   async get_souls (context) {
  //     const souls = await api.get_souls()
  //     context.commit('set_souls', souls)
  //
  //     context.commit ('add_new_soul', {'new_soul_id': souls[0].id, 'new_soul': souls[0]})
  //     context.commit ('add_new_soul', {'new_soul_id': souls[1].id, 'new_soul': souls[1]})
  //     context.commit ('add_new_soul', {'new_soul_id': souls[2].id, 'new_soul': souls[2]})
  //   },
  //
  //   async get_soul_by_id (context, id) {
  //     const soul = await api.get_soul_by_id(id)
  //     context.commit('set_souls', [soul])
  //   },
  //
  //   async get_souls_by_field (context, payload) {
  //     const souls = await api.get_souls_by_field(payload.field, payload.value)
  //     context.commit('set_souls', souls)
  //   },
  //
  //   async update_soul (context, payload) {
  //     await api.update_soul(payload.id, payload.data)
  //   },
  //
  //   async delete_soul (context, id) {
  //     await api.delete_soul(id)
  //   }
  // }
})
