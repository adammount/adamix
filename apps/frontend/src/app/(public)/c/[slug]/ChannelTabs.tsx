'use client'

import { Tabs, type TabItem } from '@/ui/Tabs'

export type ChannelTab = 'home' | 'videos' | 'playlists' | 'about'

const TABS: TabItem<ChannelTab>[] = [
	{ id: 'home', label: 'Home' },
	{ id: 'videos', label: 'Videos' },
	{ id: 'playlists', label: 'Playlists' },
	{ id: 'about', label: 'About' }
]

interface Props {
	active: ChannelTab
	onChange: (tab: ChannelTab) => void
}

export function ChannelTabs({ active, onChange }: Props) {
	return <Tabs tabs={TABS} active={active} onChange={onChange} />
}
