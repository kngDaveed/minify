import React, { useState, useEffect } from "react";
import History from "../components/History";
import { generateQRCode } from "../utils/qrcode";

function MinifyForm() {
  const [longUrl, setLongUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [qr, setQR] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = "/api/shorten";

  useEffect(() => {
    const stored = localStorage.getItem("minifyHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleShorten = async () => {
    setIsLoading(true);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl.trim(), slug }),
    });

    if (!response.ok) {
      // Attempt to parse JSON error, but fallback to text if it fails
      let errorMessage = "An unexpected error occurred.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = await response.text(); // Get raw text if not JSON
      }

      if (response.status === 409) {
        alert(`Slug already taken: ${errorMessage}. Please choose another.`);
      } else {
        alert(`Error: ${response.status} - ${errorMessage}`);
      }
      setIsLoading(false);
      return;
    }
    const data = await response.json();
    console.log("Sent body:", { url: longUrl });
    console.log("Received data:", data);

    setShortUrl(data.shortUrl);
    setCopied(false);
    setLongUrl("");
    setSlug("");

    const qrCode = await generateQRCode(data.shortUrl);
    setQR(qrCode);

    const exists = history.find((item) => item.shortUrl === data.shortUrl);
    if (!exists) {
      const updatedHistory = [
        { shortUrl: data.shortUrl, originalUrl: longUrl },
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
      className="flex flex-col lg:flex-row items-start justify-center py-12 px-4 bg-white gap-8 md:gap-12"
    >
      {/* Left column: Form */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 md:p-8 w-full max-w-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">
          Minify Your Long URL
        </h1>
        <p className="text-blue-800 mb-6">
          Paste your long URL below and get a short version instantly!
        </p>

        <label htmlFor="long-url" className="sr-only">
          Long URL
        </label>
        <input
          id="long-url"
          aria-label="Long URL"
          type="text"
          className="w-full px-5 py-3 border border-gray-200 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://example.com/very/long/link"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <label htmlFor="slug" className="sr-only">
          Custom Slug
        </label>
        <input
          id="slug"
          aria-label="Custom Slug"
          type="text"
          className="w-full px-5 py-3 border border-gray-200 rounded-full mb-4"
          placeholder="Optional custom slug (e.g. daniel)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

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

        {shortUrl && (
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
                <li>Click “Shorten It” to instantly get a short link.</li>
                <li>Copy the link and share it anywhere.</li>
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
