import type { IPagination } from './pagination.types'
import type { IVideo } from './video.types'

export interface ICategory {
	id: string
	name: string
	slug: string
	createdAt: string
	updatedAt: string
}

export interface ICategoryWithPreview extends ICategory {
	_count: {
		videos: number
	}
	videos: {
		thumbnailUrl: string
	}[]
}

export interface ICategoryVideosResponse extends IPagination {
	category: ICategory
	videos: IVideo[]
}
