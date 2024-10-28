// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0GFPVBm9Am24_dQlgURdwB2KsfAVcVLE",
  authDomain: "prachipportfolioimage.firebaseapp.com",
  projectId: "prachipportfolioimage",
  storageBucket: "prachipportfolioimage.appspot.com",
  messagingSenderId: "631947340172",
  appId: "1:631947340172:web:4c37f9cb479b6258770ea9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);