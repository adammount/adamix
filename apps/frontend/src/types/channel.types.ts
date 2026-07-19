import type { IPlaylistPreview } from './playlist.types'
import type { IUser } from './user.types'
import type { IVideo } from './video.types'

export interface IChannel {
	id: string
	slug: string
	description: string
	isVerified: boolean
	avatarUrl: string
	bannerUrl: string
	user: IUser
	videos: IVideo[]
	subscribers: IUser[]
	_count?: {
		subscribers: number
		videos?: number
	}
	createdAt: string
}

export interface IChannelDetail extends IChannel {
	_count: {
		subscribers: number
		videos: number
	}
	playlists: IPlaylistPreview[]
}
