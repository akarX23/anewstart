import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCovAOsDedTJkJKvXWlkwTjrpRz667skmA",
  authDomain: "form-test-d9028.firebaseapp.com",
  databaseURL: "https://form-test-d9028.firebaseio.com",
  projectId: "form-test-d9028",
  storageBucket: "form-test-d9028.appspot.com",
  messagingSenderId: "768098845855",
  appId: "1:768098845855:web:1a39db7e0b265c16884eaa",
  measurementId: "G-RZK4X02N6N",
};

firebase.initializeApp(firebaseConfig);

const firebaseDb = firebase.database();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { firebaseDb, googleAuth, firebase };
