interface CoverSource {
	id: string
	coverUrl?: string | null
	videos: { thumbnailUrl: string }[]
}

export function getPlaylistCover(playlist: CoverSource, size = 512): string {
	return (
		playlist.coverUrl ||
		playlist.videos[0]?.thumbnailUrl ||
		`https://picsum.photos/seed/${playlist.id}/${size}/${size}`
	)
}
