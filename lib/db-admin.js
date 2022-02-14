import { compareDesc, parseISO } from 'date-fns';
import { db } from './firebase-admin';

export async function getAllFeedback(siteId, route) {
  try {
    let ref = db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .where('status', '==', 'active');
    if (route) {
      ref = ref.where('route', '==', route);
    }
    const snapshot = await ref.get();
    const feedback = [];
    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });
    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );
    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(uid) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );
  return { sites };
}
export async function getUserFeedbacks(uid) {
  const snapshot = await db
    .collection('feedback')
    .where('authorId', '==', uid)
    .get();
  const feedbacks = [];
  snapshot.forEach((doc) => {
    feedbacks.push({ id: doc.id, ...doc.data() });
  });
  return feedbacks;
}
export async function getAllFeedbackforSites(uid) {
  const { sites } = await getUserSites(uid);
  const feedbacks = await getUserFeedbacks(uid);
  if (!sites.length && feedbacks.length) {
    return feedbacks;
  }
  const siteIds = sites.map((site) => site.id);
  const collectionPath = db.collection('feedback');
  const batches = [];
  while (siteIds.length) {
    const batch = siteIds.splice(0, 10);
    batches.push(
      await collectionPath
        .where('siteId', 'in', [...batch])
        .where('authorId', '!=', uid)
        .get()
        .then((results) =>
          results.docs.map((result) => ({ id: result.id, ...result.data() }))
        )
    );
  }
  feedbacks.forEach((feedback) => batches.push(feedback));

  return Promise.all(batches).then((content) => content.flat());
}
export async function getAllSites() {
  const snapshot = await db.collection('sites').get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}
export async function getSite(siteId) {
  const doc = await db.collection('sites').doc(siteId).get();
  if (!doc.exists) {
    return { site: [] };
  }
  const site = { id: doc.id, ...doc.data() };
  return { site };
}
