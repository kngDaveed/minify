import { JSDOM } from "jsdom";

export async function scrapeMeta(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed with ${res.status}`);
    const html = await res.text();

    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const getMeta = (property) =>
      doc.querySelector(`meta[property='${property}']`)?.content ||
      doc.querySelector(`meta[name='${property}']`)?.content;

    const title = getMeta("og:title") || doc.title || "";
    const description = getMeta("og:description") || "";
    const image =
      getMeta("og:image") ||
      getMeta("twitter:image") ||
      "https://miniphy.vercel.app/meta-default.png";

    return {
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
    };
  } catch (err) {
    console.error("❌ scrapeMeta error:", err.message);
    return null;
  }
}
