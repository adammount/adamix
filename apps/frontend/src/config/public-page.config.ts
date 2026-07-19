class PublicPage {
	AUTH = '/auth'

	HOME = '/'
	TRENDING = '/trending'
	SUBSCRIPTIONS = '/my/subscriptions'

	MY_CHANNEL = '/my-channel'
	HISTORY = '/my/history'
	LIKED_VIDEOS = '/my/liked-videos'
	SETTINGS = '/my/settings'

	VIDEO(path: string) {
		return `/v/${path}`
	}

	CHANNEL(path: string) {
		return `/c/${path}`
	}

	CATEGORY(slug: string) {
		return `/category/${slug}`
	}

	PLAYLISTS(path?: string) {
		return `/my/playlists${path ? `/${path}` : ''}`
	}

	SEARCH(searchTerm: string) {
		return `/s?term=${searchTerm}`
	}
}

export const PAGE = new PublicPage()
