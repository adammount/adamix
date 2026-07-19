import type { IUserSettingsUpdate } from '@/types/settings.types'

export type UpdateSettings = (patch: IUserSettingsUpdate) => void
