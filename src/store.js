import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    corgis: null
  },

  mutations: {
    setCorgis(state, payload) { state.corgis = payload }
  },

  actions: {
    // refactor

    login (context, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(payload => { context.commit('setUser', { id: payload.user.uid }) })
        .catch(error => { console.log(error) })
    },

    async getCorgies(context) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('corgis').get()
          .then(snapshot => {
            const corgis = []
            for (let document of snapshot.docs) corgis.push({ id: document.id, name: document.data().name })
            context.commit('setCorgis', corgis)
            resolve()
          })
          .catch(error => {
            console.log(error)
          })
      })
    },

    async uploadCorgi(context, payload) {
      firebase.firestore().collection('corgis').add(payload)
        .then(payload => { resolve(payload.id) })
        .catch(error => { console.log(error) })
    },

    async updateCorgi (context, payload) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('corgis').doc(payload.corgiId).update(payload.newData)
          .then(payload => { resolve(payload.id) })
          .catch(error => { console.log(error) })
      })
    },

    async deleteCorgi (context, payload) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('corgis').doc(payload.corgiId).delete(payload.newData)
          .then(payload => { resolve(payload.id) })
          .catch(error => { console.log(error) })
      })
    },
  },

  getters: {
    corgis (state) { return state.corgis }
  }
})
