const self = this;

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  const {
    request,
    request: {
      url,
      method,
    },
  } = event;
  if  (url.match("/token")) {
    switch(method) {
      case "POST":
        console.log('trying to save token');
        request.json().then(body => {
          caches.open("/token").then(function(cache) {
            cache.put("/token", new Response(JSON.stringify(body)));
          });
        }); 
        break;
      case "GET":
        console.log('trying to get token');
        event.respondWith(
          caches.open("/token").then(function(cache) {
            return cache.match("/token").then(function (response) {
              return response || new Response('{}');;
            }) || new Response('{}');
          })
        );
        break;
      case "DELETE":
        console.log('trying to delete a token');
        caches.open("/token").then(function(data){
          caches.delete("/token");
        });
    }
  } else {
    return event;
  }
});
