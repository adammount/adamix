import type { ReactNode } from 'react'

interface Props {
	title: string
	children: ReactNode
}

export function SettingsPanel({ title, children }: Props) {
	return (
		<div className='flex flex-col gap-[12rem] rounded-[24rem] glass px-[13rem] py-[17rem] md:gap-[16rem] md:rounded-[40rem] md:p-[21rem]'>
			<h2 className='font-heading text-[18rem] font-semibold text-white md:text-[30rem]'>
				{title}
			</h2>
			<div className='flex flex-col gap-[12rem]'>{children}</div>
		</div>
	)
}
