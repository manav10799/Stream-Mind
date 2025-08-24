// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdGC8JZtBmnL2U_FERVvsLNl-zzkNajZU",
  authDomain: "stream-mind-9f149.firebaseapp.com",
  projectId: "stream-mind-9f149",
  storageBucket: "stream-mind-9f149.firebasestorage.app",
  messagingSenderId: "677701480227",
  appId: "1:677701480227:web:bcc2d6ac3e0f34146d6696",
  measurementId: "G-XCJ4JT7HPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Conditionally initialize analytics
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
export const db = getFirestore(app);

export const auth = getAuth();
