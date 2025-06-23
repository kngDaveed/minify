import React, { useState, useEffect } from "react";
import History from "../components/History";

function MinifyForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const apiUrl = "/api/shorten";

  useEffect(() => {
    const stored = localStorage.getItem("minifyHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleShorten = async () => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl.trim() }),
    });

    const data = await response.json();
    console.log("Sent body:", { url: longUrl });
    console.log("Received data:", data);

    setShortUrl(data.result_url);
    setCopied(false);
    setLongUrl("");

    const exists = history.find((item) => item.shortUrl === data.result_url);
    if (exists) return;

    const updatedHistory = [
      { shortUrl: data.result_url, originalUrl: longUrl },
      ...history,
    ];
    setHistory(updatedHistory);
    localStorage.setItem("minifyHistory", JSON.stringify(updatedHistory));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div
      id="minify"
      className="flex flex-col lg:flex-row items-start justify-center py-12 px-4 bg-white gap-8 md:gap-12"
    >
      {/* Left column: Form */}
      <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 md:p-8 w-full max-w-xl">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">
          Minify Your Long URL
        </h1>
        <p className="text-blue-800 mb-6">
          Paste your long URL below and get a short version instantly!
        </p>

        <input
          type="text"
          className="w-full px-5 py-3 border border-gray-200 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://example.com/very/long/link"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <button
          onClick={handleShorten}
          className="w-full border-2 border-blue-700 hover:border-blue-900 bg-blue-600 text-white py-[10px] rounded-full hover:bg-blue-700 transition"
        >
          Shorten It!
        </button>

        {shortUrl && (
          <div className="mt-6">
            <p className="text-green-600 font-medium">✅ Your shortened URL:</p>
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
          </div>
        )}
      </div>

      {/* Right column: History or Guide */}
      <div className="text-center w-full max-w-md">
        {history.length > 0 ? (
          <div id="history">
            <History history={history} setHistory={setHistory} />
          </div>
        ) : (
          <div id="minify-guide">
            <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-start">
              <h2 className="text-lg font-semibold mb-2">🚀 How to Use Minify</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Paste any long URL into the input field above.</li>
                <li>Click “Shorten It” to instantly get a short link.</li>
                <li>Copy the link and share it anywhere.</li>
              </ul>
            </div>
            <div className="flex mt-2 p-4 rounded-md shadow-sm text-sm border border-gray-200">
              Your shortened links will appear here for quick access as "History".
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MinifyForm;
