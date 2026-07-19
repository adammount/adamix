import cn from 'clsx'
import Image from 'next/image'

import { getInitials } from '@/utils/get-initials'

interface Props {
	src?: string | null
	name?: string | null
	size: number
	className?: string
	sizeClassName?: string
}

export function Avatar({ src, name, size, className, sizeClassName }: Props) {
	const style = sizeClassName
		? undefined
		: { width: `${size}rem`, height: `${size}rem` }

	if (!src)
		return (
			<div
				style={style}
				className={cn(
					'flex shrink-0 items-center justify-center rounded-full bg-white-15 font-medium text-white',
					sizeClassName,
					className
				)}
			>
				<span style={{ fontSize: `${size * 0.4}rem` }}>
					{getInitials(name || 'Anonym')}
				</span>
			</div>
		)

	return (
		<div
			style={style}
			className={cn(
				'relative shrink-0 overflow-hidden rounded-full',
				sizeClassName,
				className
			)}
		>
			<Image
				src={src}
				alt={name || ''}
				fill
				sizes={`${size}px`}
				className='object-cover'
			/>
		</div>
	)
}
