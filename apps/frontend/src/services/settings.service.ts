import { instance } from '@/api/axios'

import type { IUserSettings, IUserSettingsUpdate } from '@/types/settings.types'

class SettingsService {
	private _SETTINGS = '/settings'

	getSettings() {
		return instance.get<IUserSettings>(this._SETTINGS)
	}

	updateSettings(data: IUserSettingsUpdate) {
		return instance.put<IUserSettings>(this._SETTINGS, data)
	}
}

export const settingsService = new SettingsService()
