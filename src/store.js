import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/api/firebase'
import * as soulModel from '@/models/soul'

Vue.use(Vuex)

const souls_container = {
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
        const souls = await souls_container.api.get_souls()
        for (let soul of souls) context.commit('add_soul', soul)
      },

      async get_soul_by_id (context, id) {
        const soul = await souls_container.api.get_soul_by_id(id)
        context.commit('add_soul', soul)
      },

      async get_souls_by_field (context, payload) {
        const souls = await souls_container.api.get_souls_by_field(payload.field, payload.value)
        for (let soul of souls) context.commit('add_soul', soul)
      },

      async create_soul (context, soul) {
        const id = await souls_container.api.create_soul(soul)
        soul = await souls_container.api.get_soul_by_id(id)
        context.commit('add_soul', soul)
        context.commit('set_active_soul', soul)
      },

      async update_soul (context, payload) {
        await souls_container.api.update_soul(payload.id, payload.data)
        const soul = await souls_container.api.get_soul_by_id(payload.id)
        context.commit('update_soul', soul)
      },

      async update_active_soul (context) {
        let soul = context.getters.active_soul
        await souls_container.api.update_soul(soul.id, { name: soul.name })
        soul = await souls_container.api.get_soul_by_id(soul.id)
        context.commit('update_soul', soul)
      },

      async delete_soul (context, id) {
        await souls_container.api.delete_soul(id)
        context.commit('delete_soul', context.state.souls[id])
      },

      async delete_active_soul (context) {
        let soul = context.getters.active_soul
        await souls_container.api.delete_soul(soul.id)
        context.commit('delete_soul', soul)
        context.commit('set_active_soul', false)
      }
    }
  },

  api: {
    get_souls: async function () {
      const documents = await firebase.read('souls')
      const souls = documents.map(document => souls_container.parser.instantiateNote(document))
      return souls
    },

    create_soul: async function (soul) {
      const id = await firebase.create('souls', soul)
      return id
    },

    get_soul_by_id: async function (id) {
      const document = await firebase.readById('souls', id)
      const souls = souls_container.parser.instantiateNote(document)
      return souls
    },

    get_souls_by_field: async function (field, value) {
      const documents = await firebase.readByField('souls', field, value)
      const souls = documents.map(document => souls_container.parser.instantiateNote(document))
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
    souls: souls_container.module
  }
})
