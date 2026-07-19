import Image from 'next/image'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	src: string
	alt: string
	sizes: string
	className?: string
	rounded?: string
	priority?: boolean
	children?: ReactNode
}

export function VideoThumbnail({
	src,
	alt,
	sizes,
	className,
	rounded = 'rounded-[20rem]',
	priority,
	children
}: Props) {
	return (
		<div
			className={twMerge(
				'relative overflow-hidden',
				rounded,
				className
			)}
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes={sizes}
				priority={priority}
				className='object-cover transition-transform duration-500 group-hover:scale-105'
			/>
			{children}
		</div>
	)
}
