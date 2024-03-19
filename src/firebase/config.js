import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyATPvDX4MFakktwVyhSoCdsqw0ekR24vzs",
  authDomain: "sportxchange-31030.firebaseapp.com",
  databaseURL: "https://sportxchange-31030-default-rtdb.firebaseio.com",
  projectId: "sportxchange-31030",
  storageBucket: "sportxchange-31030.appspot.com",
  messagingSenderId: "1090681853772",
  appId: "1:1090681853772:web:f5270a347ab0d4946b21e9",
  measurementId: "G-HLG06NYZT1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
