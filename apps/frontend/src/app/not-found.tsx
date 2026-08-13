import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

export default function NotFoundPage() {
	return (
		<div className='flex min-h-[calc(100dvh-120rem)] flex-col items-center justify-center gap-[16rem] text-center'>
			<h1 className='font-heading text-[120rem] font-bold leading-none text-white'>404</h1>
			<p className='text-[18rem] text-white-60'>Page not found</p>
			<Link
				href={PAGE.HOME}
				className='glass-action mt-[8rem]'
			>
				Back to home
			</Link>
		</div>
	)
}
