import { Link2Icon } from "lucide-react";
import { useState, React } from "react";




const History = ({ history = [] }) => {


  const [showHistory, setShowHistory] = useState(false);


  return (
    <div id="history" className="p-4 md:p-8 bg-white shadow-md border border-gray-200 rounded-xl">
      {showHistory ? (
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 mb-8">
            Your Minify History
          </h1>
          {history.map((url) => (
            <div
              key={url.id}
              className="flex items-start gap-3 p-4 border rounded-md bg-white shadow-sm"
            >
              <Link2Icon className="w-5 h-5 mt-1 text-blue-600 dark:text-blue-400" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-600">
                  Original:{" "}
                  <a
                    href={url.original}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {url.original}
                  </a>
                </span>
                <span className="text-sm text-gray-600 mt-1">
                  Shortened:{" "}
                  <a
                    href={url.short}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline break-all"
                  >
                    {url.short}
                  </a>
                </span>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
        <div
          id="minify-guide"
          className=" bg-blue-50 p-4 rounded-md text-blue-800 text-start"
        >
          <h2 className="text-lg font-semibold mb-2">🚀 How to Use Minify</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Paste any long URL into the input field above.</li>
            <li>Click “Shorten It” to instantly get a short link.</li>
            <li>Copy the link and share it anywhere.</li>
          </ul>
        </div>
        <div className="flex mt-2 p-4 rounded-md  shadow-sm text-sm border border-gray-200 ">
          Your shortened links will appear here for quick access as "History".
        </div>
        </>
        
      )}
    </div>
  );
};

export default History;
