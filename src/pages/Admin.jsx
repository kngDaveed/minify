import React, { useEffect, useState } from 'react';
// import kv from '../api/kvClient';
import { useSearchParams, Navigate } from 'react-router-dom';

function Admin() {
  const [links, setLinks] = useState([]);
  const [params] = useSearchParams();
  const secret = import.meta.env.VITE_ADMIN_SECRET;


if (params.get('admin') !== secret) {
    return <Navigate to="/" />;
  }


  // useEffect(() => {
  //   (async () => {
  //     const slugs = await kv.lrange('links', 0, -1);
  //     const stats = await Promise.all(
  //       slugs.map(async (slug) => {
  //         const meta = await kv.hgetall(`link:${slug}`);
  //         const clicks = await kv.get(`clicks:${slug}`);
  //         return { slug, ...meta, clicks };
  //       })
  //     );
  //     setLinks(stats);
  //   })();
  // }, []);

  useEffect(() => {
  (async () => {
    const res = await fetch('/api/get-links');
    const data = await res.json();
    setLinks(data);
  })();
}, []);


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🔍 Analytics Dashboard</h1>
      <table className="w-full text-left border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Slug</th>
            <th className="p-2">Title</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">URL</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 text-blue-700">{link.slug}</td>
              <td className="p-2">{link.title || '-'}</td>
              <td className="p-2">{link.clicks || 0}</td>
              <td className="p-2 truncate max-w-[200px] text-sm">
                <a href={link.url} target="_blank" className="text-blue-500 underline">
                  {link.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
