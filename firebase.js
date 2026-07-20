import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_JZcLlhZdD3J5S98vKHmQjWG_g1jUQHI",
  authDomain: "fitarc-3d80b.firebaseapp.com",
  projectId: "fitarc-3d80b",
  storageBucket: "fitarc-3d80b.firebasestorage.app",
  messagingSenderId: "689550926779",
  appId: "1:689550926779:web:6dd4c005a5e2c235fa1a9e",
  measurementId: "G-4ST22D9802"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
