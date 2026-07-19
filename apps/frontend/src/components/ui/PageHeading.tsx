import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: ReactNode
	className?: string
}

export function PageHeading({ children, className }: Props) {
	return (
		<h1
			className={twMerge(
				'font-heading text-[36rem] font-medium leading-[40rem] text-white/80',
				className
			)}
		>
			{children}
		</h1>
	)
}
