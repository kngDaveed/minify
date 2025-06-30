import kv from "./kvClient";
import { nanoid } from "nanoid";
import { scrapeMeta } from "../../utils/scrapeMeta";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { url } = req.body;
    if (!url || !url.startsWith("http")) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    const meta = await scrapeMeta(url);
    if (!meta || !meta.title || !meta.image) {
      return res.status(400).json({
        message:
          "Could not fetch valid metadata. Please use custom mode to continue.",
        meta: { failed: true },
      });
    }

    const slug = nanoid(6);

    await kv.hset(`link:${slug}`, {
      url,
      ...meta,
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({
      slug,
      shortUrl: `https://miniphy.vercel.app/m/${slug}`,
      originalUrl: url,
      meta,
    });
  } catch (err) {
    console.error("❌ auto-shorten error:", err.message);
    return res.status(500).json({
      message: "Server error while shortening. Please try again.",
      error: err.message,
    });
  }
}
