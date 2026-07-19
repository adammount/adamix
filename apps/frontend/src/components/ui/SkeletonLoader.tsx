import type { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	count?: number
	style?: CSSProperties
	className?: string
}

export function SkeletonLoader({ count = 1, className = '', style }: Props) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className={twMerge('h-[40rem] animate-pulse rounded-[16rem] bg-white-15', className)}
					style={style}
				/>
			))}
		</>
	)
}
