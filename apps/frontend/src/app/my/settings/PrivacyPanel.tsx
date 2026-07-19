import { Activity, Eye, History } from 'lucide-react'
import { memo, useCallback } from 'react'

import { Switch } from '@/ui/controls/Switch'

import { SettingsPanel } from './SettingsPanel'
import { SettingsRow } from './SettingsRow'
import type { UpdateSettings } from './settings.types'

interface Props {
	profileVisibility: boolean
	watchHistory: boolean
	activityStatus: boolean
	update: UpdateSettings
}

export const PrivacyPanel = memo(function PrivacyPanel({
	profileVisibility,
	watchHistory,
	activityStatus,
	update
}: Props) {
	const onProfileVisibility = useCallback(
		(value: boolean) => update({ profileVisibility: value }),
		[update]
	)
	const onWatchHistory = useCallback(
		(value: boolean) => update({ watchHistory: value }),
		[update]
	)
	const onActivityStatus = useCallback(
		(value: boolean) => update({ activityStatus: value }),
		[update]
	)

	return (
		<SettingsPanel title='Privacy'>
			<SettingsRow
				icon={Eye}
				label='Profile Visibility'
			>
				<Switch
					checked={profileVisibility}
					onChange={onProfileVisibility}
				/>
			</SettingsRow>
			<SettingsRow
				icon={History}
				label='Watch History'
			>
				<Switch
					checked={watchHistory}
					onChange={onWatchHistory}
				/>
			</SettingsRow>
			<SettingsRow
				icon={Activity}
				label='Activity Status'
			>
				<Switch
					checked={activityStatus}
					onChange={onActivityStatus}
				/>
			</SettingsRow>
		</SettingsPanel>
	)
})
