// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// export const provider = new GoogleAuthProvider();

// provider.setCustomParameters({prompt: 'select_account'})
