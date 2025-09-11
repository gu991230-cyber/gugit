import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEB-HD-v3mRe6oEw9Q9IAPkpwJ72nhGvM",
  authDomain: "jjjj-68bdb.firebaseapp.com",
  projectId: "jjjj-68bdb",
  storageBucket: "jjjj-68bdb.firebasestorage.app",
  messagingSenderId: "881936314676",
  appId: "1:881936314676:web:097cb955c2746974717561",
  measurementId: "G-G14XY8ZX59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (temporarily disabled)
// export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const analytics = null;

// Firebase 연결 테스트
console.log('🔥 Firebase 초기화 완료 - 새 설정 적용됨');
console.log('🔥 프로젝트 ID:', firebaseConfig.projectId);
console.log('🔥 API Key:', firebaseConfig.apiKey.substring(0, 10) + '...');
console.log('🔥 Firestore 객체:', db);

export default app; 