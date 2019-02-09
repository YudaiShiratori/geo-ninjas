import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyDV7NrZFh5bRePiJopOeFRoQHFIBSSNmsw",
  authDomain: "geo-ninjas-966f2.firebaseapp.com",
  databaseURL: "https://geo-ninjas-966f2.firebaseio.com",
  projectId: "geo-ninjas-966f2",
  storageBucket: "geo-ninjas-966f2.appspot.com",
  messagingSenderId: "486681739116"
};

const firebaseApp = firebase.initializeApp(config);

export default firebase.firestore();