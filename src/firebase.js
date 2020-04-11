import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfMV1scRCQOd2gtAWIpzsc5kelOgRbeOY",
  authDomain: "reflection-questions-app.firebaseapp.com",
  databaseURL: "https://reflection-questions-app.firebaseio.com",
  projectId: "reflection-questions-app",
  storageBucket: "reflection-questions-app.appspot.com",
  messagingSenderId: "646080079576",
  appId: "1:646080079576:web:6ecdf582ce35281930d9ad",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export default firestore;
