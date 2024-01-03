import firebase from "firebase/compat/app";

import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACvH9HokuEvI4KwXsufRWmlB_YTVWZ10o",
    authDomain: "realtimechatapp-4f9d8.firebaseapp.com",
    projectId: "realtimechatapp-4f9d8",
    storageBucket: "realtimechatapp-4f9d8.appspot.com",
    messagingSenderId: "397067891460",
    appId: "1:397067891460:web:218f053f5029565bcd5651",
    measurementId: "G-L0GR9YRMN4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099");
if (window.location.hostname === "localhost") {
    db.useEmulator("localhost", "8080");
}

export { db, auth };
export default firebase;
