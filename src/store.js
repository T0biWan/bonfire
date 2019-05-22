import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from '@/firebase.js'
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
    // refactor

    // muss auch in api.js
    // login (context, payload) {
    //   firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    //     .then(payload => { context.commit('setUser', { id: payload.user.uid }) })
    //     .catch(error => { console.log(error) })
    // },

  //   async create (context, payload) {
  //     return new Promise((resolve, reject) => {
  //       firebase.firestore().collection(payload.collection).add(payload.data)
  //         .then(resolve())
  //         .catch(error => { console.log(error) })
  //     })
  //   },
  //
  //   async read (context, payload) {
  //     return new Promise((resolve, reject) => {
  //       firebase.firestore().collection(payload.collection).get()
  //         .then(snapshot => {
  //           const documents = []
  //           for (let document of snapshot.docs) documents.push(document)
  //           resolve(documents)
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     })
  //   },
  //
  //   async update (context, collection, payload) {
  //     return new Promise((resolve, reject) => {
  //       firebase.firestore().collection(collection).doc(payload.id).update(payload.newData)
  //         .then(resolve())
  //         .catch(error => { console.log(error) })
  //     })
  //   },
  //
  //   async delete (context, collection, payload) {
  //     return new Promise((resolve, reject) => {
  //       firebase.firestore().collection(collection).doc(payload.id).delete()
  //         .then(resolve())
  //         .catch(error => { console.log(error) })
  //     })
  //   },
  //
  //   async uploadCorgi (context, corgi) {
  //     context.dispatch('create', { collection: 'corgis', data: corgi })
  //   },
  //
    async getCorgies (context) {
      context.commit('setCorgis', api.getCorgis())
    },
  //
  //   async updateCorgi (context, corgi) {
  //     await context.dispatch('update', payload)
  //   },
  //
  //   async deleteCorgi (context, payload) {
  //     await context.dispatch('delete', 'corgis', payload)
  //   }
  },

  getters: {
    corgis (state) { return state.corgis }
  }
})
