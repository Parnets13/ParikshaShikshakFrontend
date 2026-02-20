import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Pre-cache assets
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache API responses
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate()
);

// Install & Activate event for Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("my-app-cache").then((cache) => {
        return cache.addAll(["/", "/index.html", "/favicon.ico"]);
      })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
});
