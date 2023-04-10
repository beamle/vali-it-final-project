import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-ZgIxRTfI-tX4bF9NWt4jlu075ZTxTx0",
    authDomain: "myfirstproject-a0555.firebaseapp.com",
    projectId: "myfirstproject-a0555",
    storageBucket: "myfirstproject-a0555.appspot.com",
    messagingSenderId: "80129126522",
    appId: "1:80129126522:web:de7dc03e6e856889b1cbc3",
    measurementId: "G-MD8WYLQE4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const storage = getStorage(app)
export const db = getFirestore(app);
