import firebase from '@/api/firebase.js'

export async function create (collection, data) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).add(data)
      .then(snapshot => resolve(snapshot.id))
      .catch(error => { console.log(error) })
  })
}

export async function read (collection) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).get()
      .then(snapshot => {
        const documents = []
        for (let document of snapshot.docs) documents.push(document)
        resolve(documents)
      })
      .catch(error => { console.log(error) })
  })
}

export async function readById (collection, id) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).doc(id).get()
      .then(snapshot => {
        const document = snapshot
        resolve(document)
      })
      .catch(error => { console.log(error) })
  })
}

export async function readByField (collection, field, value) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).where(field, '==', value).get()
      .then(snapshot => {
        const documents = []
        for (let document of snapshot.docs) documents.push(document)
        resolve(documents)
      })
      .catch(error => { console.log(error) })
  })
}

export async function update (collection, id, data) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).doc(id).update(data)
      .then(resolve())
      .catch(error => { console.log(error) })
  })
}

export async function remove (collection, id) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).doc(id).delete()
      .then(resolve())
      .catch(error => { console.log(error) })
  })
}
