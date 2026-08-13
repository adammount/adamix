'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { memo } from 'react'

import { PAGE } from '@/config/public-page.config'

import type { ISidebarItem } from '../sidebar.types'

import { MenuItem } from './MenuItem'
import { MyChannelMenuItem } from './MyChannelMenuItem'
import { useTypedSelector } from '@/store'

interface Props {
	title?: string
	menu: ISidebarItem[]
	isShowedSidebar: boolean
}

export const SidebarMenu = memo(function SidebarMenu({ menu, title, isShowedSidebar }: Props) {
	const pathname = usePathname()
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return (
		<nav>
			{title && (
				<div className='mb-[12rem] mt-[16rem] px-[8rem] text-[10rem] font-semibold uppercase tracking-[1rem] text-white-40'>
					{title}
				</div>
			)}
			<ul className='flex flex-col gap-[6rem]'>
				{menu.map(menuItem => {
					const props = {
						item: menuItem,
						isActive: !!match(menuItem.link)(pathname),
						isShowedSidebar
					}

					const isMyChannel = menuItem.link === PAGE.MY_CHANNEL
					const isMyChannelItem = isMyChannel && isLoggedIn

					return isMyChannelItem ? (
						<MyChannelMenuItem
							key={menuItem.label}
							{...props}
						/>
					) : isMyChannel ? null : (
						<MenuItem
							key={menuItem.label}
							{...props}
						/>
					)
				})}
			</ul>
		</nav>
	)
})
