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

import { db } from './firebase';

export function createUser(uid, newUser) {
  return setDoc(doc(db, 'users', uid), newUser, { merge: true });
}
export async function updateUsernameForFeedbacks(uid, newDisplayName) {
  const q = query(collection(db, 'feedback'), where('authorId', '==', uid));
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  snapshot.forEach((doc) => {
    batch.update(doc.ref, { author: newDisplayName });
  });
  return batch.commit();
}
export function createFeedback(newFeedback) {
  return addDoc(collection(db, 'feedback'), newFeedback);
}
export function createSite(newSite) {
  const site = addDoc(collection(db, 'sites'), newSite);
  return site;
}
export function updateFeedbackStatus(feedbackId, newValues) {
  return updateDoc(doc(db, 'feedback', feedbackId), newValues);
}
export function updateFeedback(feedbackId, newValues) {
  return updateDoc(doc(db, 'feedback', feedbackId), newValues);
}
export async function deleteSiteAndFeedbacks(siteId) {
  deleteDoc(doc(db, 'sites', siteId));
  const q = query(collection(db, 'feedback'), where('siteId', '==', siteId));
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);
  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  return batch.commit();
}
export function deleteFeedback(feedbackId) {
  return deleteDoc(doc(db, 'feedback', feedbackId));
}
