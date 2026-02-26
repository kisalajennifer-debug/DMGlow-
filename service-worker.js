self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("dmglow-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js');
}
