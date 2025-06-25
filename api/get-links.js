import kv from './kvClient.js';

export default async function handler(_, res) {
  try {
    const slugs = await kv.lrange('links', 0, -1);

    const stats = await Promise.all(
      slugs.map(async (slug) => {
        const meta = await kv.hgetall(`link:${slug}`);
        const clicks = await kv.get(`clicks:${slug}`);
        return { slug, ...meta, clicks };
      })
    );

    res.status(200).json(stats);
  } catch (err) {
    console.error('API Error in get-links:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
