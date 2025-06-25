import { createClient } from "@vercel/kv";

const kv = createClient({
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
  url: process.env.UPSTASH_REDIS_REST_URL,
  env: process.env.KV_REST_API_ENVIRONMENT || "production", // optional fallback
});

export default kv;
