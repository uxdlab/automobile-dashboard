import {getStorage} from 'firebase/storage'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjC1oEHlN5jSQRLI8ollGxL-OXQp5x0Kc",
  authDomain: "automobile-2eb5a.firebaseapp.com",
  projectId: "automobile-2eb5a",
  storageBucket: "automobile-2eb5a.appspot.com",
  messagingSenderId: "657652048004",
  appId: "1:657652048004:web:8870a8af7f4cab58b022d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app) 