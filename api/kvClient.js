import { createClient } from '@vercel/kv';

const kv = createClient({
  token: process.env.KV_REST_API_TOKEN,
  url: process.env.KV_REST_API_URL,
  env: process.env.KV_REST_API_ENVIRONMENT || "production", // optional fallback
});

export default kv;
