import {
	CirclePlay,
	Compass,
	Flame,
	FolderHeart,
	History,
	ListVideo,
	Settings,
	TvMinimalPlay
} from 'lucide-react'

import { PAGE } from '@/config/public-page.config'

import type { ISidebarItem } from './sidebar.types'

export const SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Compass,
		label: 'Explore',
		link: PAGE.HOME
	},
	{
		icon: Flame,
		label: 'Trending',
		link: PAGE.TRENDING
	},
	{
		icon: CirclePlay,
		label: 'Subscription',
		link: PAGE.SUBSCRIPTIONS,
		isBottomBorder: true
	},
	{
		icon: TvMinimalPlay,
		label: 'My channel',
		link: PAGE.MY_CHANNEL
	},
	{
		icon: ListVideo,
		label: 'Playlist',
		link: PAGE.PLAYLISTS()
	},
	{
		icon: History,
		label: 'History',
		link: PAGE.HISTORY
	},
	{
		icon: FolderHeart,
		label: 'Liked videos',
		link: PAGE.LIKED_VIDEOS
	}
]

export const BOTTOM_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Settings,
		label: 'Settings',
		link: PAGE.SETTINGS
	}
]
