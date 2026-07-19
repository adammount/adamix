'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Logo } from '@/ui/icons/Logo'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { PAGE } from '@/config/public-page.config'

import { BurgerButton } from './BurgerButton'
import { HeaderLinks } from './HeaderLinks'
import { SearchField } from './SearchField'

const DynamicHeaderProfile = dynamic(
	() => import('./profile/HeaderProfile').then(mod => mod.HeaderProfile),
	{
		ssr: false,
		loading: () => (
			<SkeletonLoader className='size-[22rem] mb-0 rounded-full md:size-[32rem]' />
		)
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
		<header className='flex items-center justify-between gap-[8rem] p-[8rem] md:gap-[24rem] md:px-[16rem] md:py-[16rem]'>
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
					<Logo className='h-[26rem] w-auto md:h-[40rem]' />
				</Link>
			</div>

			<SearchField />

			<div className='flex h-[26rem] shrink-0 items-center justify-center gap-[8rem] rounded-[40rem] border border-white-15 bg-white-15 pl-[6rem] pr-[2rem] backdrop-blur-md md:h-[44rem] md:px-[6rem]'>
				<HeaderLinks />
				<DynamicHeaderProfile />
			</div>
		</header>
	)
}
