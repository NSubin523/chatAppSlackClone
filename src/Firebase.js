import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCnSKhUN58JyYWO6kIdObLn-gGItPgwRMs",
    authDomain: "slack-clone-reactjs-9e403.firebaseapp.com",
    projectId: "slack-clone-reactjs-9e403",
    storageBucket: "slack-clone-reactjs-9e403.appspot.com",
    messagingSenderId: "93514407931",
    appId: "1:93514407931:web:d3c66aa497fad847d0f55e"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider,db}