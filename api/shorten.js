import kv from './kvClient.js';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST requests allowed' });

  const { url, slug: customSlug, title, description, image } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  const slug = customSlug?.trim() || nanoid(6);
  const exists = await kv.exists(`link:${slug}`);
  if (exists) return res.status(409).json({ error: 'Slug already in use' });

  const record = { url, title: title || '', description: description || '', image: image || '' };
  await kv.hset(`link:${slug}`, record);
  await kv.lpush('links', slug); // For admin analytics

  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  return res.status(200).json({ shortUrl: `${protocol}://${host}/p/${slug}` });
}
