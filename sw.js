//Aignar nombre y versiónd de la cache
const CACHE_NAME = 'v1_cache_AGJH';

//Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    'style.css',
    'imagenes/after hours.jpeg',
    'imagenes/dawn fm.jpg',
    'imagenes/hurry up tomorrow.jpeg',
    'imagenes/ig.png',
    'imagenes/sptf.webp',
    'imagenes/tt.png',
    'Favi/Favicon-16.png',
    'Favi/Favicon-32.png',
    'Favi/Favicon-64.png',
    'Favi/Favicon-128.png',
    'Favi/Favicon-256.png',
    'Favi/Favicon-512.png',
    'Favi/Favicon-1024.png'
]

//Evento install
//Instalacion del service worker y guarda en cache los recursos
self.addEventListener('install', e => {
    e.waitUntill(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
        })
        .catch(err => console.log('No se ha registrado el cache', err))
    );
});

//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});