import { memo, useCallback } from 'react'

import { RangeSlider } from '@/ui/controls/RangeSlider'
import { Select } from '@/ui/controls/Select'
import { Switch } from '@/ui/controls/Switch'

import { NotImplemented } from './NotImplemented'
import { SettingsPanel } from './SettingsPanel'
import { SettingsRow } from './SettingsRow'
import type { UpdateSettings } from './settings.types'

interface Props {
	defaultQuality: string
	autoplay: boolean
	language: string
	dataSaver: boolean
	bufferSize: number
	update: UpdateSettings
}

const QUALITY_OPTIONS = [
	{ label: 'High Video', value: '1080p' },
	{ label: 'Medium Video', value: '720p' },
	{ label: 'Low Video', value: '480p' }
]

const AUTOPLAY_OPTIONS = [
	{ label: 'Autoplay', value: 'true' },
	{ label: 'Off', value: 'false' }
]

const LANGUAGE_OPTIONS = [
	{ label: 'English', value: 'English' },
	{ label: 'Русский', value: 'Russian' }
]

export const PlaybackPanel = memo(function PlaybackPanel({
	defaultQuality,
	autoplay,
	language,
	dataSaver,
	bufferSize,
	update
}: Props) {
	const onQuality = useCallback((value: string) => update({ defaultQuality: value }), [update])
	const onAutoplay = useCallback(
		(value: string) => update({ autoplay: value === 'true' }),
		[update]
	)
	const onLanguage = useCallback((value: string) => update({ language: value }), [update])
	const onDataSaver = useCallback((value: boolean) => update({ dataSaver: value }), [update])
	const onBufferSize = useCallback((value: number) => update({ bufferSize: value }), [update])

	return (
		<SettingsPanel title='Playback and Performance'>
			<SettingsRow label='Default Video Quality'>
				<NotImplemented>
					<Select
						value={defaultQuality}
						onChange={onQuality}
						options={QUALITY_OPTIONS}
					/>
				</NotImplemented>
			</SettingsRow>
			<SettingsRow label='Autoplay'>
				<Select
					value={String(autoplay)}
					onChange={onAutoplay}
					options={AUTOPLAY_OPTIONS}
				/>
			</SettingsRow>
			<SettingsRow label='Language'>
				<NotImplemented>
					<Select
						value={language}
						onChange={onLanguage}
						options={LANGUAGE_OPTIONS}
					/>
				</NotImplemented>
			</SettingsRow>
			<SettingsRow label='Data Saver'>
				<NotImplemented>
					<Switch
						checked={dataSaver}
						onChange={onDataSaver}
					/>
				</NotImplemented>
			</SettingsRow>
			<SettingsRow label='Buffer Size'>
				<NotImplemented>
					<RangeSlider
						className='flex-1'
						value={bufferSize}
						onChange={onBufferSize}
					/>
				</NotImplemented>
			</SettingsRow>
		</SettingsPanel>
	)
})
