import kv from './kvClient.js'; // updated import from your own kvClient wrapper

export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ error: 'Missing slug parameter' });
    }

    const meta = await kv.hgetall(`link:${slug}`);
    const clicks = await kv.get(`clicks:${slug}`);
    return res.status(200).json({ meta, clicks });
  } catch (err) {
    console.error('API Error in get-meta:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
