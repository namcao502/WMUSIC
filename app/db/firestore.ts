import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

initializeApp({
    apiKey: "AIzaSyB90gHlGA4TbfA5M1l-ImchthIP40XY0Yg",
    authDomain: "music-c3885.firebaseapp.com",
    projectId: "music-c3885",
    storageBucket: "music-c3885.appspot.com",
    messagingSenderId: "269638464049",
    appId: "1:269638464049:web:1d054010e95165ed455b10",
    measurementId: "G-YZE0C71R6Y",
});

const firestore = getFirestore();

export default { firestore };
