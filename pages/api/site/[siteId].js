import { getSite } from '@/lib/db-admin';
export default async function handler(req, res){
  try {
    const { siteId } = req.query;
    const { site } = await getSite(siteId);
    res.status(200).json({ site });
  } catch (error) {
    res.status(500).json({ error });
  }
};
