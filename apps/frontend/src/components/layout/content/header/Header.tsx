'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Logo } from '@/ui/icons/Logo'

import { PAGE } from '@/config/public-page.config'

import { BurgerButton } from './BurgerButton'
import { HeaderLinks } from './HeaderLinks'
import { SearchField } from './SearchField'

const DynamicHeaderProfile = dynamic(
	() => import('./profile/HeaderProfile').then(mod => mod.HeaderProfile),
	{
		ssr: false,
		loading: () => <SkeletonLoader className='mb-0 size-[28rem] rounded-full md:size-[32rem]' />
	}
)

interface Props {
	isShowedSidebar: boolean
	toggleSidebar: () => void
	isMobileMenuOpen: boolean
	toggleMobileMenu: () => void
}

export function Header({
	isShowedSidebar,
	toggleSidebar,
	isMobileMenuOpen,
	toggleMobileMenu
}: Props) {
	return (
		<header className='flex items-center justify-between gap-[8rem] p-[8rem] pl-[max(8rem,env(safe-area-inset-left))] pr-[max(8rem,env(safe-area-inset-right))] pt-[calc(8rem+env(safe-area-inset-top))] md:gap-[24rem] md:px-[16rem] md:py-[16rem] md:pt-[calc(16rem+env(safe-area-inset-top))]'>
			<div className='flex shrink-0 items-center gap-[12rem] md:gap-[24rem]'>
				<BurgerButton
					isShowedSidebar={isShowedSidebar}
					toggleSidebar={toggleSidebar}
					isMobileMenuOpen={isMobileMenuOpen}
					toggleMobileMenu={toggleMobileMenu}
				/>
				<Link
					href={PAGE.HOME}
					aria-label='Home'
				>
					<Logo className='h-[32rem] w-auto md:h-[40rem]' />
				</Link>
			</div>

			<SearchField />

			<div className='flex h-[36rem] shrink-0 items-center justify-center gap-[10rem] rounded-[40rem] border border-white-15 bg-white-15 pl-[10rem] pr-[6rem] backdrop-blur-md md:h-[44rem] md:gap-[8rem] md:px-[6rem]'>
				<HeaderLinks />
				<DynamicHeaderProfile />
			</div>
		</header>
	)
}
