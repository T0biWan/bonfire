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
