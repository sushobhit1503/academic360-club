import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC9m1Mp3YzXmiKfbIXmorBKS9J6jOlyimE",
    authDomain: "academics360-counseling.firebaseapp.com",
    projectId: "academics360-counseling",
    storageBucket: "academics360-counseling.appspot.com",
    messagingSenderId: "466595015634",
    appId: "1:466595015634:web:603abdd13a3dbe0628360b",
    measurementId: "G-1F7C55J7CD"
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const firestore = firebase.firestore ()
export const storage = firebase.storage ()

export default firebase