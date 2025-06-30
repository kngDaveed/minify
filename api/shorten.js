// /api/shorten.js
import kv from "./kvClient";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { url, slug, title, description, image } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  const newSlug = slug?.trim() || nanoid(6);

  await kv.hset(`link:${newSlug}`, {
    url,
    title: title?.trim() || "Untitled Page",
    description: description?.trim() || "No description provided.",
    image: image || "https://miniphy.vercel.app/meta-default.png",
    createdAt: new Date().toISOString(),
  });

  return res.status(200).json({
    slug: newSlug,
    shortUrl: `https://miniphy.vercel.app/m/${newSlug}`,
  });
}
