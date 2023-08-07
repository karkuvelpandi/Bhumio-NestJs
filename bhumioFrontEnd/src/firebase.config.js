import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8sI9bx816a1dnTmwnpEs-NPn-9B5uLiU",
  authDomain: "crud-95951.firebaseapp.com",
  projectId: "crud-95951",
  storageBucket: "crud-95951.appspot.com",
  messagingSenderId: "1095960340235",
  appId: "1:1095960340235:web:a140e7a3d257f8d162240e",
};
const app = initializeApp(firebaseConfig);
// Firebase storage reference
const storage = getStorage(app);
export default storage;
