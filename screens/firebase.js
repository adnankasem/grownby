// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXSrY0IRolLJzn8QVhYsnfkDL7LnzUV_Q",
  authDomain: "grownby-88e77.firebaseapp.com",
  projectId: "grownby-88e77",
  storageBucket: "grownby-88e77.appspot.com",
  messagingSenderId: "907665110404",
  appId: "1:907665110404:web:486f75be5d569e0242d9d1",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
