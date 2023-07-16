import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDxeRa5AXiMUBfv_kOhNDmiCy6ysHzIe48",
    authDomain: "crud-4277f.firebaseapp.com",
    projectId: "crud-4277f",
    storageBucket: "crud-4277f.appspot.com",
    messagingSenderId: "91515571249",
    appId: "1:91515571249:web:8258c4fdbbef0d7248d910",
    measurementId: "G-E3VNN6VX5J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, app, auth }