import React, { useState } from "react";

function History({ history, setHistory }) {
  const [expanded, setExpanded] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // latest | oldest

  const deleteLink = (shortUrl) => {
    const updated = history.filter((item) => item.shortUrl !== shortUrl);
    setHistory(updated);
    localStorage.setItem("minifyHistory", JSON.stringify(updated));
  };

  const copyLink = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedSlug(shortUrl);
    setTimeout(() => setCopiedSlug(null), 500);
  };

  const clearHistory = () => {
    localStorage.removeItem("minifyHistory");
    setHistory([]);
  };

  // ✅ Search + Filter Logic
  const filteredHistory = history
    .filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.originalUrl.toLowerCase().includes(term) ||
        item.shortUrl.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "latest") return 0; // Already in latest order
      return 1; // reverse for "oldest"
    });

  const visibleLinks = expanded ? filteredHistory : filteredHistory.slice(0, 3);
  const remaining = filteredHistory.length - 3;

  if (history.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-xl p-4 w-full max-w-md text-left">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-800">Your Minified Links</h2>
        {history.length >= 3 && (
          <button
            onClick={clearHistory}
            className="text-red-500 text-sm hover:underline"
          >
            Clear History
          </button>
        )}
      </div>

      {/* 🔍 Search + Sort Controls */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          placeholder="Search by URL or slug..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="latest">Sort: Latest</option>
          <option value="oldest">Sort: Oldest</option>
        </select>
      </div>

      {visibleLinks.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No matching links found.</p>
      )}

      {visibleLinks.map((item, idx) => (
        <div
          key={`${item.shortUrl}-${idx}`}
          className="flex justify-between items-center border border-gray-200 rounded-md mb-2 p-2"
        >
          <div className="w-3/4">
            <p className="truncate text-sm text-gray-700">
              {item.originalUrl}
            </p>
            <a
              href={item.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              {item.shortUrl}
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => copyLink(item.shortUrl)}
              className="bg-blue-500 text-white px-3 py-1 text-xs rounded-md hover:bg-blue-600"
            >
              {copiedSlug === item.shortUrl ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => deleteLink(item.shortUrl)}
              className="bg-red-500 text-white px-3 py-1 text-xs rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {remaining > 0 && (
        <div className="mt-2 text-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-blue-600 text-sm hover:underline"
          >
            {expanded ? "Show Less" : `+${remaining} more`}
          </button>
        </div>
      )}
    </div>
  );
}

export default History;
