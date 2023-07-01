const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyDoQl_VBSHsj7rvwH6EF6klmirrX0RE4ig",
    authDomain: "music-color-form.firebaseapp.com",
    projectId: "music-color-form",
    storageBucket: "music-color-form.appspot.com",
    messagingSenderId: "817742528484",
    appId: "1:817742528484:web:cdcdc43eb7a774ad9551f1",
    measurementId: "G-2S2ES8QQ0Q"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const Users = db.collection('users')
module.exports = Users