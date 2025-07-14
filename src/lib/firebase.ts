import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT39szRqhoBJJWyW6xBasLl4lxAhgy6FE",
  authDomain: "lolo5599-1ed73.firebaseapp.com",
  projectId: "lolo5599-1ed73",
  storageBucket: "lolo5599-1ed73.firebasestorage.app",
  messagingSenderId: "701473195654",
  appId: "1:701473195654:web:01f676913c9d443f2ff307",
  measurementId: "G-L8NLPC8QN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Firebase 연결 테스트
console.log('Firebase 초기화 완료');
console.log('프로젝트 ID:', firebaseConfig.projectId);
console.log('Firestore 객체:', db);

export default app; 