'use client'

import { Clapperboard, Gamepad2, type LucideIcon, Music, Newspaper, TrendingUp } from 'lucide-react'

import { type TabItem, Tabs } from '@/ui/Tabs'

const ALL_TAB = 'all'

const TAB_ICONS: Record<string, LucideIcon> = {
	music: Music,
	gaming: Gamepad2,
	news: Newspaper,
	movies: Clapperboard
}

interface Tab {
	slug: string
	name: string
}

interface Props {
	tabs: Tab[]
	active: string | null
	onChange: (slug: string | null) => void
}

export function TrendingTabs({ tabs, active, onChange }: Props) {
	const items: TabItem<string>[] = [
		{ id: ALL_TAB, label: 'All', icon: TrendingUp },
		...tabs.map(tab => ({
			id: tab.slug,
			label: tab.name,
			icon: TAB_ICONS[tab.slug]
		}))
	]

	return (
		<Tabs
			tabs={items}
			active={active ?? ALL_TAB}
			onChange={id => onChange(id === ALL_TAB ? null : id)}
		/>
	)
}
