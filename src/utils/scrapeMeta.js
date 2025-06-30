import { JSDOM } from "jsdom";

export async function scrapeMeta(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const getMeta = (property) =>
      doc.querySelector(`meta[property='${property}']`)?.content ||
      doc.querySelector(`meta[name='${property}']`)?.content;

    return {
      title: getMeta("og:title") || doc.title || "Untitled Page",
      description: getMeta("og:description") || "No description found.",
      image:
        getMeta("og:image") ||
        getMeta("twitter:image") ||
        "https://miniphy.vercel.app/meta-default.png",
    };
  } catch (err) {
    console.error("Meta scraping failed:", err);
    return null;
  }
}
