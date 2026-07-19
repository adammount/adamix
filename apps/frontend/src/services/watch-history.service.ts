import { instance } from '@/api/axios'

import type { IPaginationParams } from '@/types/pagination.types'
import type { IWatchHistoryResponse } from '@/types/video.types'

class WatchHistoryService {
	private _WATCH_HISTORY = '/watch-history'

	getUserHistory(params?: IPaginationParams) {
		return instance.get<IWatchHistoryResponse>(this._WATCH_HISTORY, { params })
	}

	addToHistory(videoId: string) {
		return instance.post(this._WATCH_HISTORY, { videoId })
	}

	clearHistory() {
		return instance.delete(this._WATCH_HISTORY)
	}
}

export const watchHistoryService = new WatchHistoryService()
