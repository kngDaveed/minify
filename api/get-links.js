import { kv } from '@vercel/kv';

export default async function handler(_, res) {
  const slugs = await kv.lrange('links', 0, -1);
  const stats = await Promise.all(
    slugs.map(async (slug) => {
      const meta = await kv.hgetall(`link:${slug}`);
      const clicks = await kv.get(`clicks:${slug}`);
      return { slug, ...meta, clicks };
    })
  );
  res.status(200).json(stats);
}
