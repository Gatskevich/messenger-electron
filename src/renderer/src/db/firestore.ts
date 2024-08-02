import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_API_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_API_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_API_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_API_APP_ID
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
