import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import htmlMeta from 'vite-plugin-html-meta';

export default defineConfig({
  plugins: [
    react(),
    htmlMeta({
      title: 'Minify | Free URL Shortener',
      description: 'Shorten URLs with ease. Clean, fast, and copy-ready. Built with React + Vite.',
      image: 'https://miniphy.vercel.app/og-preview.png',
      url: 'https://miniphy.vercel.app',
    }),
  ],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    outDir: 'dist',
  },
});
