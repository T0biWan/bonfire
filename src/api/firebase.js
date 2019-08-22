import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAQ8TIocG8HyPdFrvp0IdTVBVgj48MjHEM',
  authDomain: 'souls-f75b2.firebaseapp.com',
  databaseURL: 'https://souls-f75b2.firebaseio.com',
  projectId: 'souls-f75b2',
  storageBucket: '',
  messagingSenderId: '91779100524',
  appId: '1:91779100524:web:45b1cd576a95e69b'
}

const firebaseApp = firebase.initializeApp(config)
export default firebaseApp

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
