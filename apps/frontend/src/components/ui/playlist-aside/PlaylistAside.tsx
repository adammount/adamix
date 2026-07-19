import type { ReactNode } from 'react'

interface Props {
	title: string
	subtitle: string
	children: ReactNode
}

export function PlaylistAside({ title, subtitle, children }: Props) {
	return (
		<aside className='flex w-full shrink-0 flex-col gap-[16rem] rounded-[24rem] border border-white-15 bg-white-15 px-[13rem] py-[17rem] backdrop-blur-[10rem] md:sticky md:top-[16rem] md:w-[320rem] md:rounded-[32rem] md:p-[17rem]'>
			<div className='flex flex-col gap-[2rem]'>
				<h2 className='font-heading text-[18rem] text-white'>{title}</h2>
				<p className='text-[12rem] text-white-60'>{subtitle}</p>
			</div>
			{children}
		</aside>
	)
}
