import React, { useState } from "react";

function History({ history, setHistory }) {
  const [expanded, setExpanded] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(null); // 🆕

  const deleteLink = (shortUrl) => {
    const updated = history.filter((item) => item.shortUrl !== shortUrl);
    setHistory(updated);
    localStorage.setItem("minifyHistory", JSON.stringify(updated));
  };

  const copyLink = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedSlug(shortUrl);
    setTimeout(() => setCopiedSlug(null), 500); // copy to copied & Reset after 0.5s
  };

  const clearHistory = () => {
    localStorage.removeItem("minifyHistory");
    setHistory([]);
  };

  const visibleLinks = expanded ? history : history.slice(0, 3);
  const remaining = history.length - 3;

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
          <div className="flex gap-1">
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
