const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDh0QAqlis2IlrjPQvi81gDpG6jha7ZYaY",
    authDomain: "music-project-b2012.firebaseapp.com",
    databaseURL: "https://music-project-b2012-default-rtdb.firebaseio.com",
    projectId: "music-project-b2012",
    storageBucket: "music-project-b2012.appspot.com",
    messagingSenderId: "513956523527",
    appId: "1:513956523527:web:845b2f57db6eef6678c4a2",
    measurementId: "G-WL64STZVRJ"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const Users = db.collection('users')
module.exports = Users