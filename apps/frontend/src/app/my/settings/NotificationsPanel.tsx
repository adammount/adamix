import { Bell, Mail, MessageSquare, Video } from 'lucide-react'
import { memo, useCallback } from 'react'

import { RangeSlider } from '@/ui/controls/RangeSlider'
import { Switch } from '@/ui/controls/Switch'

import { SettingsPanel } from './SettingsPanel'
import { SettingsRow } from './SettingsRow'
import type { UpdateSettings } from './settings.types'

interface Props {
	emailNotifications: boolean
	pushNotifications: boolean
	newVideoAlerts: boolean
	commentMentions: boolean
	frequency: number
	update: UpdateSettings
}

export const NotificationsPanel = memo(function NotificationsPanel({
	emailNotifications,
	pushNotifications,
	newVideoAlerts,
	commentMentions,
	frequency,
	update
}: Props) {
	const onEmail = useCallback(
		(value: boolean) => update({ emailNotifications: value }),
		[update]
	)
	const onPush = useCallback(
		(value: boolean) => update({ pushNotifications: value }),
		[update]
	)
	const onNewVideo = useCallback(
		(value: boolean) => update({ newVideoAlerts: value }),
		[update]
	)
	const onCommentMentions = useCallback(
		(value: boolean) => update({ commentMentions: value }),
		[update]
	)
	const onFrequency = useCallback(
		(value: number) => update({ frequency: value }),
		[update]
	)

	return (
		<SettingsPanel title='Notifications'>
			<SettingsRow
				icon={Mail}
				label='Email Notifications'
			>
				<Switch
					checked={emailNotifications}
					onChange={onEmail}
				/>
			</SettingsRow>
			<SettingsRow
				icon={Bell}
				label='Push Notifications'
			>
				<Switch
					checked={pushNotifications}
					onChange={onPush}
				/>
			</SettingsRow>
			<SettingsRow
				icon={Video}
				label='New Video Alerts'
			>
				<Switch
					checked={newVideoAlerts}
					onChange={onNewVideo}
				/>
			</SettingsRow>
			<SettingsRow
				icon={MessageSquare}
				label='Comment Mentions'
			>
				<Switch
					checked={commentMentions}
					onChange={onCommentMentions}
				/>
			</SettingsRow>
			<SettingsRow label='Frequency'>
				<RangeSlider
					className='flex-1'
					value={frequency}
					onChange={onFrequency}
				/>
			</SettingsRow>
		</SettingsPanel>
	)
})
