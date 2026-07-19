import { axiosClassic, instance } from '@/api/axios'

import type { IChannel, IChannelDetail } from '@/types/channel.types'
import type { IDashboard } from '@/types/dashboard.types'

class ChannelService {
	private _CHANNELS = '/channels'

	getAll() {
		return axiosClassic.get<IChannel[]>(this._CHANNELS)
	}

	getDashboard() {
		return instance.get<IDashboard>(`${this._CHANNELS}/dashboard`)
	}

	bySlug(slug?: string | null) {
		return axiosClassic.get<IChannelDetail>(`${this._CHANNELS}/by-slug/${slug}`)
	}

	toggleSubscribe(channelSlug: string) {
		return instance.patch(`${this._CHANNELS}/toggle-subscribe/${channelSlug}`)
	}
}

export const channelService = new ChannelService()
