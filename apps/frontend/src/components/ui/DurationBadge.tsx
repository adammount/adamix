import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: ReactNode
	className?: string
}

export function DurationBadge({ children, className }: Props) {
	return (
		<span
			className={twMerge(
				'absolute rounded-[12rem] bg-black-60 px-[4rem] py-[2rem] text-[7rem] text-white backdrop-blur-[8rem]',
				className
			)}
		>
			{children}
		</span>
	)
}
