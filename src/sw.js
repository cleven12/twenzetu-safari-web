// ============================================================
// Twenzetu Safari — Service Worker (sw.js)
// Strategy: Cache-first for same-origin, Network-first for
//           cross-origin, Network-only (with offline JSON) for API
// ============================================================

const CACHE_NAME = 'twenzetu-safari-v2';

// Live API base
const API_HOST = 'cf89615f228bb45cc805447510de80.pythonanywhere.com';

// Static assets to pre-cache during install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/attractions.html',
  '/attraction.html',
  '/regions.html',
  '/about.html',
  '/sponsor.html',
  '/css/styles.css',
  '/js/scripts.js',
  '/js/home.js',
  '/js/attractions.js',
  '/js/attraction.js',
  '/js/regions.js',
  '/js/about.js',
  '/js/api.js',
  '/js/mockdata.js',
  '/manifest.json',
];

// ============================================================
// INSTALL — Pre-cache static shell
// ============================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing and pre-caching assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // Activate immediately without waiting for old SW to release clients
  self.skipWaiting();
});

// ============================================================
// ACTIVATE — Clean up stale caches from previous versions
// ============================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating and cleaning old caches...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all open clients immediately
  self.clients.claim();
});

// ============================================================
// FETCH — Route requests by origin and type
// ============================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // --- API requests to live backend — Network, offline fallback ---
  if (url.hostname === API_HOST) {
    event.respondWith(networkWithApiOfflineFallback(request));
    return;
  }

  // --- Cross-origin requests (CDN libs, Unsplash, etc.) — Network-first ---
  if (url.origin !== self.location.origin) {
    event.respondWith(networkFirstThenCache(request));
    return;
  }

  // --- Same-origin requests — Cache-first, fallback to network ---
  event.respondWith(cacheFirstThenNetwork(request));
});

// ============================================================
// STRATEGY: Cache-first, fall back to network and cache result
// Used for same-origin static assets
// ============================================================
async function cacheFirstThenNetwork(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    console.warn('[SW] Network fetch failed for:', request.url, err);
    // No cached version and network failed — browser will show its own error
    throw err;
  }
}

// ============================================================
// STRATEGY: Network-first, fall back to cache
// Used for cross-origin CDN assets and images
// ============================================================
async function networkFirstThenCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    console.warn('[SW] Cross-origin network failed, checking cache:', request.url);
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw err;
  }
}

// ============================================================
// STRATEGY: Network-only with structured JSON offline response
// Used for API calls to the live backend
// ============================================================
async function networkWithApiOfflineFallback(request) {
  try {
    return await fetch(request);
  } catch (err) {
    console.warn('[SW] API request failed (offline):', request.url);
    return new Response(
      JSON.stringify({
        error: 'offline',
        message: 'API unavailable — using cached data',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
