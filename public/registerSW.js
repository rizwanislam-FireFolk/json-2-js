if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (var i = 0; i < registrations.length; i++) {
      registrations[i].unregister();
    }
  }).catch(function() {});
}
if ('caches' in window) {
  caches.keys().then(function(keys) {
    for (var j = 0; j < keys.length; j++) {
      caches.delete(keys[j]);
    }
  }).catch(function() {});
}
