import type { EnumVideoPlayerQuality } from '@/ui/video-player/video-player.types'

import type { IChannel } from './channel.types'
import type { IComment } from './comment.types'
import type { IPagination } from './pagination.types'

export interface IVideo {
	id: string
	publicId: string
	title: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	maxResolution: EnumVideoPlayerQuality
	viewsCount: number
	duration: number
	isPublic: boolean
	channel: IChannel
	createdAt: string
	updatedAt: string
}

export interface IFullVideo extends IVideo {
	likes: []
	comments: IComment[]
}

export interface ISingleVideoResponse extends IFullVideo {
	similarVideos: IVideo[]
}

export interface IStudioVideoResponse extends IFullVideo {
	tags: {
		id: string
		name: string
	}[]
}

export interface IVideosPagination extends IPagination {
	videos: IFullVideo[]
}

export interface ILikedVideo extends IVideo {
	likedAt: string
}

export interface ILikedVideosResponse extends IPagination {
	count: number
	videos: ILikedVideo[]
}

export interface IWatchHistoryItem {
	id: string
	watchedAt: string
	video: IVideo
}

export interface IWatchHistoryResponse extends IPagination {
	items: IWatchHistoryItem[]
}
