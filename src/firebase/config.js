import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// All values are injected at build time from environment variables.
// Copy .env.example to .env and fill in your Firebase project's web config
// (Firebase Console > Project Settings > General > Your apps).
const configEntries = [
  ['apiKey', import.meta.env.VITE_FIREBASE_API_KEY],
  ['authDomain', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN],
  ['projectId', import.meta.env.VITE_FIREBASE_PROJECT_ID],
  ['storageBucket', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET],
  ['messagingSenderId', import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID],
  ['appId', import.meta.env.VITE_FIREBASE_APP_ID],
];

const isPlaceholderValue = (value) => {
  if (!value || typeof value !== 'string') return true;
  return (
    value.includes('your_') ||
    value.includes('your-project-id') ||
    value.includes('your_project_id') ||
    value.includes('your_sender_id') ||
    value.includes('your_app_id') ||
    value.includes('your_api_key_here')
  );
};

const missingConfig = configEntries.filter(([, value]) => isPlaceholderValue(value));
export const isFirebaseConfigured = missingConfig.length === 0;

if (!isFirebaseConfigured) {
  console.warn(
    '[Firebase] Missing or placeholder environment values. Add your real Firebase config to .env to enable Auth/Firestore.'
  );
}

const firebaseConfig = Object.fromEntries(configEntries);
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
