import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore' // base de donnée
import 'firebase/storage'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAVAbWrP9iQ6oUfiz9Po2LE_k6g5UZxGAw",
    authDomain: "react-blog-fb837.firebaseapp.com",
    projectId: "react-blog-fb837",
    storageBucket: "react-blog-fb837.appspot.com",
    messagingSenderId: "572133628554",
    appId: "1:572133628554:web:788fdded5f73a355faeb73",
    measurementId: "G-T0NCLY9EN0"
  };
  // Initialize Firebase
  app.initializeApp(firebaseConfig);
  //app.analytics();

  const firebase = app.firestore(); // context Bdd
  export const firebaseAuth = app.auth();
  export const firebaseStorage = app.storage();

  export default firebase;