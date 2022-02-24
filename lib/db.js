import { updateProfile } from '@firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from '@firebase/firestore';

import { auth, db } from './firebase';

export function createUser(uid, data) {
  return setDoc(doc(db, 'users', uid), data, { merge: true });
}
export async function updateUsernameForFeedbacks(uid, data) {
  const q = query(collection(db, 'feedback'), where('authorId', '==', uid));
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  snapshot.forEach((doc) => {
    batch.update(doc.ref, { author: data });
  });
  return batch.commit();
}
export function createFeedback(data) {
  return addDoc(collection(db, 'feedback'), data);
}
export function createSite(data) {
  const site = addDoc(collection(db, 'sites'), data);
  return site;
}
export function updateFeedbackStatus(id, newValues) {
  return updateDoc(doc(db, 'feedback', id), newValues);
}
export function updateFeedback(id, newValues) {
  return updateDoc(doc(db, 'feedback', id), newValues);
}
export async function deleteSiteAndFeedbacks(id) {
  deleteDoc(doc(db, 'sites', id));
  const q = query(collection(db, 'feedback'), where('siteId', '==', id));
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  return batch.commit();
}
export function deleteFeedback(id) {
  return deleteDoc(doc(db, 'feedback', id));
}
