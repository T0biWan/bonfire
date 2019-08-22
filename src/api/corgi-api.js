import * as api from '@/api/firebase-api'

export async function createCorgie (corgie) {
  const id = await api.create('corgis', corgie)
  return id
}

export async function getCorgis () {
  const documents = await api.read('corgis')
  const corgis = []
  for (let document of documents) corgis.push({ id: document.id, name: document.data().name })
  return corgis
}

export async function getCorgieById (id) {
  const document = await api.readById('corgis', id)
  const corgi = { id: document.id, name: document.data().name }
  return corgi
}

export async function getCorgiesByField (field, value) {
  const documents = await api.readByField('corgis', field, value)
  const corgis = []
  for (let document of documents) corgis.push({ id: document.id, name: document.data().name })
  return corgis
}

export async function updateCorgie (id, data) {
  await api.update('corgis', id, data)
}

export async function deleteCorgie (id) {
  await api.remove('corgis', id)
}
