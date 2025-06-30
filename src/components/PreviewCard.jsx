import React from "react";

function PreviewCard({ meta }) {
  if (!meta) return null;

  if (meta.failed) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md mt-4">
        <p className="font-semibold mb-1">⚠️ Metadata: Image, Title & Descriptions could not be retrieved.</p>
        <p className="text-sm">
          The link you pasted does not have readable metadata. Please try using
          <strong> Custom Mode</strong> to set a default thumbnail, title, and description manually.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 mb-4">
      <p className="text-xs text-gray-500 mb-2">Preview</p>
      <div className="flex gap-4">
        {meta.image && (
          <img
            src={meta.image}
            alt="Preview"
            className="w-24 h-24 rounded object-cover border"
          />
        )}
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{meta.title}</h3>
          <p className="text-sm text-gray-600">{meta.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;
