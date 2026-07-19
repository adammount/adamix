'use client'

import cn from 'clsx'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { Content } from './content/Content'
import { Header } from './content/header/Header'
import { MobileMenu } from './content/header/mobile-menu/MobileMenu'
import { Sidebar } from './sidebar/Sidebar'
import { authService } from '@/services/auth.service'

import styles from './Layout.module.scss'

export function Layout({ children }: PropsWithChildren<unknown>) {
	const [isShowedSidebar, setIsShowedSidebar] = useState(true)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const pathname = usePathname()
	const isVideoPage = pathname.startsWith('/v/')

	const toggleSidebar = useCallback(() => {
		setIsShowedSidebar(prev => !prev)
	}, [])

	const toggleMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(prev => !prev)
	}, [])

	const closeMobileMenu = useCallback(() => {
		setIsMobileMenuOpen(false)
	}, [])

	useEffect(() => {
		authService.initializeAuth()
	}, [])

	return (
		<div className='relative flex min-h-screen flex-col'>
			<div className='pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden md:block'>
				<div className='blob-1 absolute -left-[177rem] -top-[172rem] size-[700rem] rounded-full bg-green-60 blur-[150rem]' />
				<div className='blob-2 absolute right-[0rem] top-[88rem] size-[800rem] rounded-full bg-pinq-60 blur-[180rem]' />
				<div className='blob-3 absolute -left-[123rem] top-[408rem] size-[500rem] rounded-full bg-brown-light/20 blur-[150rem]' />
			</div>
			<Header
				isShowedSidebar={isShowedSidebar}
				toggleSidebar={toggleSidebar}
				isMobileMenuOpen={isMobileMenuOpen}
				toggleMobileMenu={toggleMobileMenu}
			/>
			{isMobileMenuOpen && <MobileMenu onClose={closeMobileMenu} />}
			<main
				className={cn(
					'flex flex-1 gap-[16rem] pb-[16rem] pt-[12rem] md:px-[16rem] md:pt-0',
					isVideoPage ? 'px-0' : 'px-[8rem]',
					styles.initialSidebar,
					isShowedSidebar ? styles.showedSidebar : styles.hidedSidebar
				)}
			>
				<Sidebar isShowedSidebar={isShowedSidebar} />
				<Content>{children}</Content>
			</main>
		</div>
	)
}
