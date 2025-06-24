import ogs from 'open-graph-scraper';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  const { result } = await ogs({ url });
  const meta = {
    title: result.ogTitle || '',
    description: result.ogDescription || '',
    image: result.ogImage?.url || '',
  };

  res.status(200).json(meta);
}
