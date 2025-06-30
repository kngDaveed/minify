// /api/preview.js
import kv from './kvClient.js';
import ogs from 'open-graph-scraper';

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    const meta = await kv.hgetall(`link:${slug}`);
    if (!meta?.url) return res.status(404).send("Short URL not found");

    // Attempt OG scrape from the destination URL
    const ogResult = await ogs({ url: meta.url });
    const og = ogResult?.result || {};

    const ogTitle = og.ogTitle || meta.title || "Minify - free URL shortener";
    const ogDesc = og.ogDescription || meta.description || "Cleaner communication to boost conversion.";
    const ogImage = og.ogImage?.url || meta.image || "https://miniphy.vercel.app/meta-default.png";

    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="${ogTitle}" />
        <meta property="og:description" content="${ogDesc}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:url" content="https://miniphy.vercel.app/m/${slug}" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>${ogTitle}</title>
        <script>
          window.location.href = "${meta.url}";
        </script>
      </head>
      <body>
        <p style="text-align: center; font-family: sans-serif; color: #0a2540; padding-top: 50px;">
          Redirecting to your destination...
        </p>
      </body>
      </html>
    `);
  } catch (err) {
    console.error("Error in /api/preview:", err);
    return res.status(500).send("Server Error");
  }
}
