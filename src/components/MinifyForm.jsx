import React, { useState, useEffect } from "react";
import History from "../components/History";

function MinifyForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  // const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrl = "/api/shorten"; // Vercel auto handles this in same domain

  // Load from local storage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("minifyHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const handleShorten = async () => {
    // const res = await fetch(apiUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: new URLSearchParams({ url: longUrl.trim() }),
    // });
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl.trim() }),
    });
    const data = await response.json();

    console.log('Received body:', req.body);



    setShortUrl(data.result_url);
    setCopied(false);
    setLongUrl("");

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
      className="flex flex-col lg:flex-row items-start justify-center py-12 px-4 bg-white gap-12"
    >
      <div className="bg-white shadow-md border border-gray-200 rounded-xl p-4 md:p-8 w-full max-w-xl">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-blue-800">
          Minify Your Long URL
        </h1>
        <p className="text-blue-800 mb-6">
          Paste your long URL below and get a short version instantly!
        </p>

        <input
          type="text"
          className="w-full px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://example.com/very/long/link"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <button
          onClick={handleShorten}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Shorten It!
        </button>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">✅ Your shortened URL:</p>
            <div className="flex items-center justify-between bg-gray-100 rounded-md p-3 mt-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline truncate"
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className="ml-2 text-sm text-blue-500 hover:text-blue-700"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <History />
      </div>
    </div>
  );
}

export default MinifyForm;
