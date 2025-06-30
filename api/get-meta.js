// /api/get-meta.js
import kv from './kvClient'; // Adjust path if needed

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ message: "Missing slug" });
  }

  try {
    const meta = await kv.hgetall(`link:${slug}`);
    if (!meta || !meta.url) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json({ meta });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
