const VERSION = 'v1'
const STATIC_CACHE = `red-static-${VERSION}`
const RUNTIME_CACHE = `red-runtime-${VERSION}`
const IMAGE_CACHE = `red-images-${VERSION}`

const OFFLINE_URL = '/offline'

const PRECACHE_URLS = [
	OFFLINE_URL,
	'/manifest.json',
	'/images/icon-192.png',
	'/images/icon-512.png',
	'/images/icon-maskable.png'
]

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(STATIC_CACHE)
			.then(cache => cache.addAll(PRECACHE_URLS))
			.then(() => self.skipWaiting())
	)
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches
			.keys()
			.then(keys =>
				Promise.all(
					keys
						.filter(key => ![STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE].includes(key))
						.map(key => caches.delete(key))
				)
			)
			.then(() => self.clients.claim())
	)
})

function isImageRequest(request) {
	return (
		request.destination === 'image' ||
		/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/i.test(new URL(request.url).pathname)
	)
}

function isStaticAsset(url) {
	return (
		url.pathname.startsWith('/_next/static/') ||
		url.pathname.startsWith('/fonts/') ||
		/\.(css|js|woff2?|ttf)$/i.test(url.pathname)
	)
}

self.addEventListener('fetch', event => {
	const { request } = event

	if (request.method !== 'GET') return

	const url = new URL(request.url)

	if (url.origin !== self.location.origin) return

	if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) return

	if (request.mode === 'navigate') {
		event.respondWith(
			fetch(request).catch(async () => {
				const cached = await caches.match(request)
				return cached || caches.match(OFFLINE_URL)
			})
		)
		return
	}

	if (isImageRequest(request)) {
		event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE))
		return
	}

	if (isStaticAsset(url)) {
		event.respondWith(staleWhileRevalidate(request, STATIC_CACHE))
		return
	}

	event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE))
})

async function staleWhileRevalidate(request, cacheName) {
	const cache = await caches.open(cacheName)
	const cached = await cache.match(request)

	const network = fetch(request)
		.then(response => {
			if (response && response.status === 200 && response.type === 'basic')
				cache.put(request, response.clone())
			return response
		})
		.catch(() => cached)

	return cached || network
}

self.addEventListener('message', event => {
	if (event.data === 'SKIP_WAITING') self.skipWaiting()
})
