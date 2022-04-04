import { compareDesc, parseISO } from 'date-fns';

import { getAllFeedbackForSites } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async function handler(req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const result = await getAllFeedbackForSites(uid);
    const feedback = result.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );
    res.status(200).json({ feedback });
  } catch (error) {
    res.status(401).json({ error });
  }
}
