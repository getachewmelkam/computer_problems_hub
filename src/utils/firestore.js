import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

// ---------- Problems ----------

const problemsRef = collection(db, 'problems');

export async function fetchAllProblems() {
  const snap = await getDocs(problemsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchProblemsByCategory(macroCategory) {
  const q = query(
    problemsRef,
    where('macroCategory', '==', macroCategory)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchProblemById(id) {
  const ref = doc(db, 'problems', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function createProblem(data) {
  return addDoc(problemsRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function updateProblem(id, data) {
  const ref = doc(db, 'problems', id);
  return updateDoc(ref, data);
}

export async function deleteProblem(id) {
  const ref = doc(db, 'problems', id);
  return deleteDoc(ref);
}

// ---------- Announcements ----------

const announcementsRef = collection(db, 'announcements');

export async function fetchActiveAnnouncements() {
  const q = query(
    announcementsRef,
    where('isActive', '==', true)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function fetchAllAnnouncements() {
  const snap = await getDocs(announcementsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createAnnouncement(data) {
  return addDoc(announcementsRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function toggleAnnouncementActive(id, isActive) {
  const ref = doc(db, 'announcements', id);
  return updateDoc(ref, { isActive });
}

export async function deleteAnnouncement(id) {
  const ref = doc(db, 'announcements', id);
  return deleteDoc(ref);
}
