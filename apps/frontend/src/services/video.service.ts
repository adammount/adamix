import { axiosClassic } from '@/api/axios'

import type { IPaginationParams } from '@/types/pagination.types'
import type { ISingleVideoResponse, IVideo, IVideosPagination } from '@/types/video.types'

class VideoService {
	private _VIDEOS = '/videos'

	getAll(searchTerm?: string | null, params?: IPaginationParams) {
		return axiosClassic.get<IVideosPagination>(this._VIDEOS, {
			params: {
				...(searchTerm ? { searchTerm } : {}),
				...params
			}
		})
	}

	byPublicId(publicId?: string | null) {
		return axiosClassic.get<ISingleVideoResponse>(`${this._VIDEOS}/by-publicId/${publicId}`)
	}

	byChannel(channelId: string, params?: IPaginationParams) {
		return axiosClassic.get<IVideosPagination>(`${this._VIDEOS}/by-channel/${channelId}`, {
			params
		})
	}

	getTrendingVideos() {
		return axiosClassic.get<IVideo[]>(`${this._VIDEOS}/trending`)
	}

	async getExploreVideos(userId?: string, params?: IPaginationParams, excludeIds?: string[]) {
		const excludeIdsString = excludeIds?.join(',') || ''
		const { data } = await axiosClassic.get<IVideosPagination>(`${this._VIDEOS}/explore`, {
			params: userId
				? {
						userId,
						...params,
						excludeIds: excludeIdsString
					}
				: params
		})

		return data
	}

	updateViews(publicId: string) {
		return axiosClassic.put(`${this._VIDEOS}/update-views-count/${publicId}`)
	}
}

export const videoService = new VideoService()
