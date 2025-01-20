import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAtK_AH5zZQjOz1H_2wHx3Kk3kmy6pTC1E",
  authDomain: "interiordecozen.firebaseapp.com",
  projectId: "interiordecozen",
  storageBucket: "interiordecozen.firebasestorage.app",
  messagingSenderId: "23001761893",
  appId: "1:23001761893:web:437a55d2d5a11731bb1e8c",
  measurementId: "G-XYSZ3MZGX1"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);