'use client'

import { PAGE } from '@/config/public-page.config'

import { useProfileSelector } from '@/hooks/useProfile'

import { MenuItem } from './MenuItem'
import type { IMenuItemProps } from './menu.types'

export function MyChannelMenuItem({ item, ...props }: IMenuItemProps) {
	const channelSlug = useProfileSelector(data => data?.channel?.slug ?? null)

	const myChannelLink = channelSlug ? PAGE.CHANNEL(channelSlug) : null

	if (!myChannelLink) return null

	return (
		<MenuItem
			item={{
				...item,
				link: myChannelLink
			}}
			{...props}
		/>
	)
}
