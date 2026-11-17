/// <reference types="vitest" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

/**
 * Emits sw.js with every built asset precached, so the whole app
 * (including lazily loaded modules) works offline after the first visit.
 */
function offlineServiceWorker(): Plugin {
  return {
    name: 'peds-master-offline-sw',
    apply: 'build',
    generateBundle(_options, bundle) {
      const assets = Object.keys(bundle).filter((f) => !f.endsWith('.map'))
      const publicDir = path.resolve(__dirname, 'public')
      const publicFiles = fs.existsSync(publicDir)
        ? fs.readdirSync(publicDir).filter((f) => f !== 'sw.js')
        : []
      const precache = ['./', ...assets.map((f) => `./${f}`), ...publicFiles.map((f) => `./${f}`)]
      const version = Date.now().toString(36)
      const source = `/* Generated at build time. */
const CACHE = 'peds-master-${version}';
const PRECACHE = ${JSON.stringify(precache)};
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('./', { ignoreVary: true, ignoreSearch: true })));
    return;
  }
  event.respondWith(
    // ignoreVary: hosts may send "Vary: Origin", and module-script requests carry an Origin header
    caches.match(req, { ignoreVary: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
`
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), offlineServiceWorker()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
