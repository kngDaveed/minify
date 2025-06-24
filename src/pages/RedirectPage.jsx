import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

function RedirectPage() {
  const { slug } = useParams();
  const [meta, setMeta] = useState(null);

  // Track click count
  // await kv.incr(`clicks:${slug}`);
  // setMeta(data);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/get-meta?slug=${slug}`);
      const { meta } = await res.json();

      if (!meta?.url) {
        setMeta({ url: "/", title: "Not found" });
        return;
      }

      setMeta(meta);
      setTimeout(() => {
        window.location.href = meta.url;
      }, 1500);
    })();
  }, [slug]);

  /* 
  // Fast redirect after slight SEO delay
      setTimeout(() => {
        window.location.replace(data.url);
      }, 1500);
    })();
  }, [slug]);
  */

  if (!meta) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Helmet>
        <title>{meta.title || "Redirecting..."}</title>
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta httpEquiv="refresh" content={`1.5;url=${meta.url}`} />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center text-blue-700 font-semibold">
        Generating preview…
      </div>
    </>
  );
}

export default RedirectPage;
