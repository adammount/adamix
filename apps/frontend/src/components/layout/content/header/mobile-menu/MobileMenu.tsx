'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleAlert, LogOut, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { match } from 'path-to-regexp'
import { useEffect, useState } from 'react'

import { FeedbackModal } from '@/components/layout/sidebar/FeedbackModal'
import { BOTTOM_SIDEBAR_DATA, SIDEBAR_DATA } from '@/components/layout/sidebar/sidebar.data'

import { PAGE } from '@/config/public-page.config'

import { useProfile } from '@/hooks/useProfile'

import { MobileMenuItem } from './MobileMenuItem'
import { authService } from '@/services/auth.service'
import { useTypedSelector } from '@/store'

export function MobileMenu({ onClose }: { onClose: () => void }) {
	const pathname = usePathname()
	const router = useRouter()
	const queryClient = useQueryClient()
	const { isLoggedIn } = useTypedSelector(state => state.auth)
	const { profile } = useProfile()
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

	const { mutate: logout, isPending: isLoggingOut } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSettled: () => {
			authService.removeFromStorage()
			queryClient.clear()

			const isProtected = pathname.startsWith('/studio') || pathname.startsWith('/my')
			router.push(isProtected ? PAGE.HOME : pathname)
			router.refresh()
			onClose()
		}
	})

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

	const myChannelLink = profile?.channel?.slug ? PAGE.CHANNEL(profile.channel.slug) : null

	const menu = [...SIDEBAR_DATA, ...BOTTOM_SIDEBAR_DATA]

	return (
		<>
			<nav
				aria-label='Mobile menu'
				className='animate-fade-in fixed inset-x-0 bottom-0 top-[42rem] z-40 flex flex-col gap-[12rem] overflow-y-auto bg-dark-brown px-[8rem] pb-[32rem] pt-[52rem] md:hidden'
			>
				<button
					type='button'
					onClick={onClose}
					title='Close menu'
					aria-label='Close menu'
					className='transition-fast absolute right-[16rem] top-[12rem] text-white-60 hover-desktop:text-white'
				>
					<X className='size-[24rem]' />
				</button>

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

				{isLoggedIn && (
					<MobileMenuItem
						icon={LogOut}
						label={isLoggingOut ? 'Please wait...' : 'Logout'}
						onClick={() => logout()}
						onNavigate={() => {}}
					/>
				)}
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
