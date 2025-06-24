import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { slug } = req.query;
  const meta = await kv.hgetall(`link:${slug}`);
  const clicks = await kv.get(`clicks:${slug}`);
  return res.status(200).json({ meta, clicks });
}
