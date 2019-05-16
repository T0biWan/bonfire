import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp
