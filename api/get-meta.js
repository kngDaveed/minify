import kv from './kvClient.js';

export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    if (!slug) return res.status(400).json({ error: "Missing slug" });

    const meta = await kv.hgetall(`link:${slug}`);
    const clicks = (await kv.get(`clicks:${slug}`)) || 0;

    return res.status(200).json({ meta, clicks });
  } catch (err) {
    console.error('API Error in get-meta:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
