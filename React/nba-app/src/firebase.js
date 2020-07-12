import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB9i3ElHM7YTC6mEAUcx4jGnf05voVQ_m4",
  authDomain: "the-nba-22b81.firebaseapp.com",
  databaseURL: "https://the-nba-22b81.firebaseio.com",
  projectId: "the-nba-22b81",
  storageBucket: "the-nba-22b81.appspot.com",
  messagingSenderId: "738333158489",
  appId: "1:738333158489:web:11dadc3b5ec1abdc1d5548",
  measurementId: "G-Z7EYPYZCTK",
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref("articles");
const firebaseTeams = firebaseDB.ref("teams");
const firebaseVideos = firebaseDB.ref("videos");

const firebaseLooper = (snapshot) => {
  const data = [];

  snapshot.forEach((child) => {
    data.push({
      ...child.val(),
      id: child.key,
    });
  });
  return data;
};

export {
  firebase,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseDB,
  firebaseLooper,
};
