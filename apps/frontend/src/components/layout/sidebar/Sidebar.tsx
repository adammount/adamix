'use client'

import { memo } from 'react'

import { FeedbackButton } from './FeedbackButton'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscriptions } from './menus/subscriptions/SidebarSubscriptions'
import { BOTTOM_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

export const Sidebar = memo(function Sidebar({ isShowedSidebar }: { isShowedSidebar: boolean }) {
	return (
		<aside
			aria-label='Main sidebar'
			className='sticky top-[16rem] hidden h-[calc(100dvh-92rem)] flex-col justify-between self-start overflow-y-auto whitespace-nowrap rounded-[40rem] border border-white-15 bg-white-15 p-[16rem] backdrop-blur-[16rem] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden'
		>
			<div className='flex flex-col gap-[6rem]'>
				<SidebarMenu
					menu={SIDEBAR_DATA}
					isShowedSidebar={isShowedSidebar}
				/>

				<div className='subscriptionsBlock'>
					<SidebarSubscriptions />
				</div>
			</div>

			<div className='flex flex-col gap-[4rem]'>
				<span className='block px-[12rem] py-[12rem]'>
					<span className='divider' />
				</span>
				<SidebarMenu
					menu={BOTTOM_SIDEBAR_DATA}
					isShowedSidebar={isShowedSidebar}
				/>
				<FeedbackButton />
			</div>
		</aside>
	)
})
