import * as firebase from 'firebase';
import 'firebase/firestore'; 

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBUgWI3ijASenayUvGg6koBKcGvWDDCXs",
  authDomain: "slideplanningapp.firebaseapp.com",
  databaseURL: "https://slideplanningapp.firebaseio.com",
  projectId: "slideplanningapp",
  storageBucket: "",
  messagingSenderId: "396091221361",
  appId: "1:396091221361:web:3ffc47c237b3dba6",
};


let app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const fire = firebase; 

