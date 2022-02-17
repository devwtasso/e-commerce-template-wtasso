import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { cacheNames } from 'workbox-core';

precacheAndRoute(self.__WB_MANIFEST);
const currentCacheNames = { precacheTemp: `${cacheNames.precache}-temp`, ...cacheNames };

currentCacheNames.fonts = 'googlefonts';
registerRoute(
  /https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  new CacheFirst({
    cacheName: currentCacheNames.fonts,
    plugins: [new ExpirationPlugin({ maxEntries: 30 })]
  }),
  'GET'
);

// clean up old SW caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const validCacheSet = new Set(Object.values(currentCacheNames));
      return Promise.all(
        cacheNames
          .filter((cacheName) => !validCacheSet.has(cacheName))
          .map((cacheName) => {
            console.log('deleting cache', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
});
