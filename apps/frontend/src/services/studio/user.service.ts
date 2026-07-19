import { instance } from '@/api/axios'

import type { ISettingsData } from '@/app/studio/settings/settings.types'
import type { IPaginationParams } from '@/types/pagination.types'
import type { IProfileResponse } from '@/types/user.types'
import type { ILikedVideosResponse } from '@/types/video.types'

class UserService {
	private _USERS = '/users'

	getProfile() {
		return instance.get<IProfileResponse>(`${this._USERS}/profile`)
	}

	getLikedVideos(params?: IPaginationParams) {
		return instance.get<ILikedVideosResponse>(`${this._USERS}/liked-videos`, {
			params
		})
	}

	updateProfile(data: ISettingsData) {
		return instance.put<boolean>(`${this._USERS}/profile`, data)
	}

	toggleLike(videoId: string) {
		return instance.put(`${this._USERS}/profile/likes`, { videoId })
	}
}

export const userService = new UserService()
