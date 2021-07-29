import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDglcbBXyIfcEAV6rYCwUQr0Ug9YpVbdHA",
    authDomain: "meetings-32321.firebaseapp.com",
    projectId: "meetings-32321",
    storageBucket: "meetings-32321.appspot.com",
    messagingSenderId: "416122374807",
    appId: "1:416122374807:web:429a1a9225350b3a1f77d2"
  };

  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();