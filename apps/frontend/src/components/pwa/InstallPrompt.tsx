'use client'

import { Download, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'pwa-install-dismissed'

export function InstallPrompt() {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (localStorage.getItem(DISMISS_KEY)) return

		const onBeforeInstall = (event: Event) => {
			event.preventDefault()
			setDeferredPrompt(event as BeforeInstallPromptEvent)
			setIsVisible(true)
		}

		const onInstalled = () => {
			setIsVisible(false)
			setDeferredPrompt(null)
		}

		window.addEventListener('beforeinstallprompt', onBeforeInstall)
		window.addEventListener('appinstalled', onInstalled)

		return () => {
			window.removeEventListener('beforeinstallprompt', onBeforeInstall)
			window.removeEventListener('appinstalled', onInstalled)
		}
	}, [])

	const onInstall = async () => {
		if (!deferredPrompt) return
		await deferredPrompt.prompt()
		await deferredPrompt.userChoice
		setIsVisible(false)
		setDeferredPrompt(null)
	}

	const onDismiss = () => {
		localStorage.setItem(DISMISS_KEY, '1')
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<div className='fixed inset-x-[12rem] bottom-[12rem] z-50 flex items-center gap-[12rem] rounded-[20rem] border border-white-15 bg-dark-brown/95 p-[12rem] backdrop-blur-[16rem] md:inset-x-auto md:bottom-[24rem] md:right-[24rem] md:max-w-[360rem] md:rounded-[24rem] md:p-[16rem]'>
			<div className='size-[40rem] shrink-0 overflow-hidden rounded-[12rem] md:size-[48rem]'>
				<Image
					src='/images/icon-192.png'
					alt='RED Video'
					width={48}
					height={48}
					className='size-full object-cover'
				/>
			</div>

			<div className='flex min-w-0 flex-1 flex-col'>
				<span className='font-heading text-[14rem] text-white md:text-[16rem]'>
					Install RED Video
				</span>
				<span className='truncate text-[11rem] text-white-60 md:text-[12rem]'>
					Add to home screen for a faster, app-like experience.
				</span>
			</div>

			<button
				onClick={onInstall}
				className='glass-pill h-[36rem] shrink-0 gap-[6rem] px-[14rem] text-[12rem] font-semibold md:text-[14rem]'
			>
				<Download className='size-[14rem] md:size-[16rem]' />
				Install
			</button>

			<button
				onClick={onDismiss}
				aria-label='Dismiss'
				className='shrink-0 p-[4rem] text-white-60 hover-desktop:text-white'
			>
				<X className='size-[18rem]' />
			</button>
		</div>
	)
}
