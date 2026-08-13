import { LogIn } from 'lucide-react'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { HeaderAvatar } from './HeaderAvatar'
import { useTypedSelector } from '@/store'

export function HeaderProfile() {
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return isLoggedIn ? (
		<HeaderAvatar />
	) : (
		<Link
			href={PAGE.AUTH}
			aria-label='Sign in'
			className='flex size-[26rem] items-center justify-center text-white opacity-80 transition-fast hover-desktop:opacity-100 md:size-[20rem]'
		>
			<LogIn className='size-[16rem]' />
		</Link>
	)
}
