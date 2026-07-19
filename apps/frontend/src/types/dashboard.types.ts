import type { IComment } from './comment.types'
import type { IVideo } from './video.types'

export interface IDashboardVideo extends IVideo {
	_count: {
		likes: number
		comments: number
	}
}

export interface IDashboardChartPoint {
	date: string
	views: number
}

export interface IDashboard {
	totalSubscribers: number
	totalViews: number
	totalLikes: number
	totalComments: number
	latestVideo: IDashboardVideo | null
	videos: IDashboardVideo[]
	recentComments: IComment[]
	chart: IDashboardChartPoint[]
}
