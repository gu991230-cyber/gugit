import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "[YOUR_API_KEY]",
  authDomain: "[YOUR_PROJECT_ID].firebaseapp.com",
  projectId: "[YOUR_PROJECT_ID]",
  storageBucket: "[YOUR_PROJECT_ID].firebasestorage.app",
  messagingSenderId: "[YOUR_SENDER_ID]",
  appId: "[YOUR_APP_ID]",
  measurementId: "[YOUR_MEASUREMENT_ID]"
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