import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApp, getApps, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVFmp0x65jYE_QMmOLeh8VMzQ2aUFvaCI",
  authDomain: "chat-with-doc-c0aa0.firebaseapp.com",
  projectId: "chat-with-doc-c0aa0",
  storageBucket: "chat-with-doc-c0aa0.appspot.com",
  messagingSenderId: "241528310974",
  appId: "1:241528310974:web:2b9be8e09173787f6122ef",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
