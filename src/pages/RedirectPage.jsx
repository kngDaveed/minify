import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

function RedirectPage() {
  const { slug } = useParams();
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/get-meta?slug=${slug}`);
        if (!res.ok) {
          console.error(`Failed to fetch meta: ${res.status}`);
          setMeta({
            url: "/",
            title: "Invalid Link",
            description: "Could not load preview metadata.",
            image: "https://miniphy.vercel.app/meta-default.png",
          });
          return;
        }

        const data = await res.json();
        const metaData = data.meta;

        if (!metaData?.url) {
          setMeta({
            url: "/",
            title: "Not Found",
            description: "Link metadata missing.",
            image: "https://miniphy.vercel.app/meta-default.png",
          });
          return;
        }

        setMeta(metaData);

        // Optional click tracking
        // await fetch(`/api/increment-click?slug=${slug}`, { method: 'POST' });

        setTimeout(() => {
          window.location.href = metaData.url;
        }, 1500);
      } catch (error) {
        console.error("Meta fetch error:", error);
        setMeta({
          url: "/",
          title: "Error",
          description: "Server error while fetching preview.",
          image: "https://miniphy.vercel.app/meta-default.png",
        });
      }
    })();
  }, [slug]);

  if (!meta) return <p className="text-center mt-10">Loading preview...</p>;

  return (
    <>
      <Helmet>
        <title>{meta.title || "Redirecting..."}</title>
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image || "https://miniphy.vercel.app/meta-default.png"} />
        <meta property="og:url" content={`https://miniphy.vercel.app/m/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta httpEquiv="refresh" content={`1.5;url=${meta.url}`} />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center text-blue-700 font-semibold">
        Generating preview…
      </div>
    </>
  );
}

export default RedirectPage;