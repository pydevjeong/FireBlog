import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqPTDhzVltj5TmXR-7x37NQJWdteA-Pgw",
    authDomain: "myfireblog1.firebaseapp.com",
    projectId: "myfireblog1",
    storageBucket: "myfireblog1.appspot.com",
    messagingSenderId: "1002062019205",
    appId: "1:1002062019205:web:10f5e384bff6f18e3a87ec"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;


  export {timestamp};
  export default firebaseApp.firestore();