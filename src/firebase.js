import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSuC4rThEjTsHSSObjwIOI14yGedZiUjE",
  authDomain: "slack-clone-d1dc3.firebaseapp.com",
  projectId: "slack-clone-d1dc3",
  storageBucket: "slack-clone-d1dc3.appspot.com",
  messagingSenderId: "1069677674834",
  appId: "1:1069677674834:web:e217bd191d16587bedfa8b",
  measurementId: "G-CCVFJ41XN7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };