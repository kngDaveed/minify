import React, { useState, useEffect } from "react";
import History from "../components/History";
import PreviewCard from "../components/PreviewCard";
import { generateQRCode } from "../utils/qrcode";

function MinifyForm() {
  const [longUrl, setLongUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [qr, setQR] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("quick"); // "quick" or "custom"
  const [metaPreview, setMetaPreview] = useState(null);

  const apiUrl = mode === "quick" ? "/api/auto-shorten" : "/api/shorten";

  useEffect(() => {
    const stored = localStorage.getItem("minifyHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleShorten = async () => {
    setIsLoading(true);
    setMetaPreview(null);
    setShortUrl("");
    setQR("");

    const body = { url: longUrl.trim(), slug: slug.trim() };
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "An unexpected error occurred.");
      setIsLoading(false);
      return;
    }

    if (mode === "quick" && data.meta?.failed) {
      setMetaPreview({ failed: true });
      setShortUrl("");
      setQR("");
      setIsLoading(false);
      return;
    }

    setShortUrl(data.shortUrl);
    setCopied(false);
    setLongUrl("");
    setSlug("");
    setMetaPreview(data.meta || null);

    const qrCode = await generateQRCode(data.shortUrl);
    setQR(qrCode);

    const exists = history.find((item) => item.shortUrl === data.shortUrl);
    if (!exists) {
      const updatedHistory = [
        {
          shortUrl: data.shortUrl,
          originalUrl: longUrl,
          createdAt: new Date().toISOString(),
        },
        ...history,
      ];
      setHistory(updatedHistory);
      localStorage.setItem("minifyHistory", JSON.stringify(updatedHistory));
    }

    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <section
      id="minify"
      className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start justify-center py-12 px-4 bg-white gap-8 md:gap-12"
    >
      {/* Left column: Form */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 md:p-8 w-full max-w-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">
          Minify Your Long URL
        </h1>

        <p className="mb-4 text-blue-800">
          Paste your long URL below and get a short version instantly!
        </p>

        <div className="flex items-center gap-2 mb-4">
          <button
            className={`text-md w-full px-4 py-3 rounded-full border ${
              mode === "quick" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
            }`}
            onClick={() => setMode("quick")}
          >
            Quick Shorten
          </button>
          <button
            className={`text-md w-full px-4 py-3 rounded-full border ${
              mode === "custom" ? "bg-blue-600 text-white" : "bg-white text-blue-600"
            }`}
            onClick={() => setMode("custom")}
          >
            Custom Shorten
          </button>
        </div>

        <input
          type="text"
          className="w-full px-5 py-3 border border-gray-200 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://example.com/very/long/link"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        {mode === "custom" && (
          <input
            type="text"
            className="w-full px-5 py-3 border border-gray-200 rounded-full mb-4"
            placeholder="Optional custom slug (e.g. daniel)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        )}

        <button
          onClick={handleShorten}
          disabled={isLoading}
          className={`w-full border-2 border-blue-700 bg-blue-600 text-white py-[10px] rounded-full transition ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 hover:border-blue-900"
          }`}
        >
          {isLoading ? "Processing..." : "Shorten It!"}
        </button>

        {/* Metadata Preview */}
        {metaPreview && !metaPreview.failed && (
          <div className="mt-6">
            <PreviewCard meta={metaPreview} />
          </div>
        )}

        {/* Scrape fallback warning */}
        {metaPreview?.failed && (
          <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md border border-yellow-300">
            ⚠️ We couldn't fetch metadata for this link. You can switch to
            <button
              className="text-blue-600 underline ml-1"
              onClick={() => setMode("custom")}
            >
              custom mode
            </button>
            to provide your own title, image, and description.
          </div>
        )}

        {/* Success Output */}
        {shortUrl && !metaPreview?.failed && (
          <div className="mt-6">
            <p className="text-green-600 font-medium">✅ Your shortened URL:</p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
              <div className="flex items-center justify-between gap-1 bg-blue-50 rounded-md p-3 mt-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline truncate border border-gray-200 rounded-md p-3"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="w-max rounded-md transition text-white text-xs py-3 px-4 hover:bg-blue-700 bg-blue-600"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <img src={qr} alt="QR Code" className="min-w-16 min-h-16" />
            </div>
          </div>
        )}
      </div>

      {/* Right column: History or Guide */}
      <div className="text-center w-full sm:max-w-md sm:mx-auto xl:max-w-md">
        {history.length > 0 ? (
          <div id="history">
            <History history={history} setHistory={setHistory} />
          </div>
        ) : (
          <div id="minify-guide">
            <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-start">
              <h2 className="text-lg font-semibold mb-2">
                🚀 How to Use Minify
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Paste any long URL into the input field above.</li>
                <li>Choose quick or custom mode.</li>
                <li>Click “Shorten It” to get a short link + preview.</li>
              </ul>
            </div>
            <div className="flex mt-2 p-4 rounded-md shadow-sm text-sm border border-gray-200">
              Your shortened links will appear here for quick access as
              "History".
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MinifyForm;
