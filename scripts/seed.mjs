/**
 * Optional demo-data seeder.
 *
 * Usage:
 *   1. Fill in a real .env at the project root (see .env.example).
 *   2. In Firestore rules, temporarily allow writes (or run this while
 *      signed in as an admin via the Firebase Admin SDK instead).
 *   3. node scripts/seed.mjs
 *
 * This uses the same client-side config as the app for simplicity. For a
 * production seed, prefer the Firebase Admin SDK with a service account.
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import 'dotenv/config';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const problems = [
  {
    macroCategory: 'Physical Infrastructure',
    subCategory: 'Cooling & Thermals',
    problemText: 'Laptop shuts down randomly under heavy load',
    possibleCauses: [
      'Dust-clogged heatsink causing thermal throttling',
      'Dried-out thermal paste on the CPU',
      'Failing cooling fan not spinning at full speed',
    ],
    preventiveMaintenance: [
      'Clean internal fans and vents every 3 months',
      'Reapply thermal paste every 1–2 years',
      'Use the laptop on a hard, ventilated surface',
    ],
    correctiveMaintenance: [
      'Power off and unplug the device',
      'Open the back panel and inspect the heatsink and fan',
      'Remove dust with compressed air',
      'Reapply thermal paste if the CPU is exposed',
      'Reassemble and stress test with a monitoring tool',
    ],
    imageUrl: null,
  },
  {
    macroCategory: 'Connectivity',
    subCategory: 'Wi-Fi',
    problemText: 'Wi-Fi connects but has no internet access',
    possibleCauses: [
      'Router has lost its WAN/ISP connection',
      'DNS server not resolving correctly',
      'IP address conflict on the local network',
    ],
    preventiveMaintenance: [
      'Reboot the router on a monthly schedule',
      'Keep router firmware up to date',
      'Use a reliable public DNS as backup',
    ],
    correctiveMaintenance: [
      'Restart the router and modem',
      'Forget and reconnect to the Wi-Fi network',
      'Flush the local DNS cache',
      'Set a public DNS (e.g. 1.1.1.1) manually',
      'Contact the ISP if the outage persists',
    ],
    imageUrl: null,
  },
  {
    macroCategory: 'Security & Identity',
    subCategory: 'Account Lockouts',
    problemText: 'User locked out after multiple failed login attempts',
    possibleCauses: [
      'Caller forgot a recently changed password',
      'Saved credentials in a browser or app are outdated',
      'Account flagged after suspicious login attempts',
    ],
    preventiveMaintenance: [
      'Enable multi-factor authentication',
      'Use a password manager to avoid stale saved credentials',
      'Set a password expiry reminder',
    ],
    correctiveMaintenance: [
      'Verify the user\u2019s identity',
      'Unlock the account from the admin console',
      'Force a password reset on next login',
      'Clear saved credentials on the affected device',
    ],
    imageUrl: null,
  },
];

const announcements = [
  {
    title: 'Free diagnostics weekend — book your slot',
    content:
      'Bring your device in this weekend for a free full diagnostic scan, no appointment needed.',
    postType: 'Advertisement',
    isActive: true,
    bannerImage: null,
  },
];

async function seed() {
  console.log('Seeding problems…');
  for (const p of problems) {
    await addDoc(collection(db, 'problems'), { ...p, createdAt: serverTimestamp() });
  }
  console.log('Seeding announcements…');
  for (const a of announcements) {
    await addDoc(collection(db, 'announcements'), { ...a, createdAt: serverTimestamp() });
  }
  console.log('Done. Seeded', problems.length, 'problems and', announcements.length, 'announcements.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
