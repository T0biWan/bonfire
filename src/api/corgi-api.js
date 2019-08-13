import * as api from '@/api/firebase-api'

function getCorgiFromDocument (document) {
  return { id: document.id, name: document.data().name }
}

export async function getCorgis () {
  const documents = await api.read('corgis')
  const corgis = []
  for (let document of documents) corgis.push(getCorgiFromDocument(document))
  return corgis
}

// async uploadCorgi (context, corgi) {
//   context.dispatch('create', { collection: 'corgis', data: corgi })
// },
//
// async getCorgies (context) {
//   const documents = await context.dispatch('read', { collection: 'corgis' })
//   const corgis = []
//   for (let document of documents) corgis.push({ id: document.id, name: document.data().name })
// context.commit('setCorgis', corgis)
// },
//
// async updateCorgi (context, corgi) {
//   await context.dispatch('update', payload)
// },
//
// async deleteCorgi (context, payload) {
//   await context.dispatch('delete', 'corgis', payload)
// }
// },
