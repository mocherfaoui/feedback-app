import { getAllFeedback } from '@/lib/db-admin';

export default async function handler(req, res){
  try {
    const [siteId, route] = req.query.site;
    const { feedback } = await getAllFeedback(siteId, route);
    res.status(200).json({ feedback });
  } catch (error) {
    res.status(404).json({ error });
  }
};
