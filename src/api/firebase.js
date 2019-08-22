import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBqA4ShF2HcVxdwranxeySx5K12T9Vv7k8',
  authDomain: 'moneyflow-f6131.firebaseapp.com',
  databaseURL: 'https://moneyflow-f6131.firebaseio.com',
  projectId: 'moneyflow-f6131',
  storageBucket: 'moneyflow-f6131.appspot.com',
  messagingSenderId: '494123812442',
  appId: '1:494123812442:web:3098aaa4f55a3d38'
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
