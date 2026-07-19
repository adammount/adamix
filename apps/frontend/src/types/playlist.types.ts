import type { IUser } from './user.types'
import type { IVideo } from './video.types'

export interface IPlaylist {
	id: string
	title: string
	coverUrl?: string
	videos: IVideo[]
	userId: string
	createdAt: string
}

export interface IPlaylistPreview {
	id: string
	title: string
	coverUrl?: string
	videos: { thumbnailUrl: string }[]
	_count: {
		videos: number
	}
}

export interface IPlaylistDetail extends IPlaylist {
	user: IUser & {
		channel?: {
			slug: string
			isVerified: boolean
		}
	}
	viewsCount: number
	otherPlaylists: IPlaylistPreview[]
}

export interface IPlaylistData {
	title: string
	videoPublicId?: string
}
