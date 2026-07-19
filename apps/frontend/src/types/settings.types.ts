export interface IUserSettings {
	id: string
	userId: string

	emailNotifications: boolean
	pushNotifications: boolean
	newVideoAlerts: boolean
	commentMentions: boolean
	frequency: number

	profileVisibility: boolean
	watchHistory: boolean
	activityStatus: boolean

	defaultQuality: string
	autoplay: boolean
	language: string
	dataSaver: boolean
	bufferSize: number

	createdAt: string
	updatedAt: string
}

export type IUserSettingsUpdate = Partial<
	Omit<IUserSettings, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
>
