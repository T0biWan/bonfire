import firebase from '@/firebase.js'

export async function create (collection, data) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).add(data)
      .then(resolve())
      .catch(error => { console.log(error) })
  })
}

export async function read (collection) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).get()
      .then(snapshot => {
        const documents = []
        for (let document of snapshot.docs) documents.push(document)
        // console.log('read', documents);
        resolve(documents)
      })
      .catch(error => { console.log(error) })
  })
}

export async function update (collection, documentId, data) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).doc(documentId).update(data)
      .then(resolve())
      .catch(error => { console.log(error) })
  })
}

export async function _delete (collection, documentId) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collection).doc(documentId).delete()
      .then(resolve())
      .catch(error => { console.log(error) })
  })
}
