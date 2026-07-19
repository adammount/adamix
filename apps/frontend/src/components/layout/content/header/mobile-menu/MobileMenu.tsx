'use client'

import { CircleAlert } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { useEffect, useState } from 'react'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import {
	BOTTOM_SIDEBAR_DATA,
	SIDEBAR_DATA
} from '@/components/layout/sidebar/sidebar.data'
import { FeedbackModal } from '@/components/layout/sidebar/FeedbackModal'
import { useTypedSelector } from '@/store'

import { MobileMenuItem } from './MobileMenuItem'

export function MobileMenu({ onClose }: { onClose: () => void }) {
	const pathname = usePathname()
	const { isLoggedIn } = useTypedSelector(state => state.auth)
	const { profile } = useProfile()
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = ''
		}
	}, [])

	useEffect(() => {
		const mq = window.matchMedia('(min-width: 768px)')
		const handler = (e: MediaQueryListEvent) => {
			if (e.matches) onClose()
		}
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	}, [onClose])

	const myChannelLink = profile?.channel?.slug
		? PAGE.CHANNEL(profile.channel.slug)
		: null

	const menu = [...SIDEBAR_DATA, ...BOTTOM_SIDEBAR_DATA]

	return (
		<>
			<nav
				aria-label='Mobile menu'
				className='animate-fade-in fixed inset-x-0 bottom-0 top-[42rem] z-40 flex flex-col gap-[12rem] overflow-y-auto bg-dark-brown px-[8rem] pb-[32rem] pt-[24rem] md:hidden'
			>
				{menu.map(item => {
					const isMyChannel = item.link === PAGE.MY_CHANNEL

					if (isMyChannel) {
						if (!isLoggedIn || !myChannelLink) return null

						return (
							<MobileMenuItem
								key={item.label}
								href={myChannelLink}
								icon={item.icon}
								label={item.label}
								isActive={!!match(myChannelLink)(pathname)}
								onNavigate={onClose}
							/>
						)
					}

					return (
						<MobileMenuItem
							key={item.label}
							href={item.link}
							icon={item.icon}
							label={item.label}
							isActive={!!match(item.link)(pathname)}
							onNavigate={onClose}
						/>
					)
				})}

				<MobileMenuItem
					icon={CircleAlert}
					label='Feedback'
					onClick={() => setIsFeedbackOpen(true)}
					onNavigate={() => {}}
				/>
			</nav>

			{isFeedbackOpen && (
				<FeedbackModal
					onClose={() => {
						setIsFeedbackOpen(false)
						onClose()
					}}
				/>
			)}
		</>
	)
}
