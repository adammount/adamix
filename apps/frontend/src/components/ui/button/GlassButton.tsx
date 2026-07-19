import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'gradient' | 'solid' | 'ghost'

interface BaseProps {
	children: ReactNode
	icon?: ReactNode
	variant?: Variant
	className?: string
}

const variants = {
	gradient:
		'h-[46rem] justify-center gap-[8rem] rounded-full border border-white-15 bg-gradient-to-l from-white-15/15 via-white-15 to-brown-light/15 px-[21rem] text-white backdrop-blur-[8rem] not-disabled:hover-desktop:brightness-110',
	solid:
		'h-[46rem] justify-center gap-[8rem] rounded-full border border-white-15 bg-white-15 px-[21rem] text-white-60 backdrop-blur-[8rem] not-disabled:hover-desktop:bg-white-25 not-disabled:hover-desktop:text-white',
	ghost: 'gap-[16rem] px-[8rem] py-[4rem] text-white-60 not-disabled:hover-desktop:text-white'
}

function styles(variant: Variant, className?: string) {
	return twMerge(
		'transition-base disabled-state flex items-center text-[14rem] font-semibold',
		variants[variant],
		className
	)
}

type ButtonProps = BaseProps &
	ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = BaseProps & { href: string }

export function GlassButton(props: ButtonProps): ReactNode
export function GlassButton(props: LinkProps): ReactNode
export function GlassButton({
	children,
	icon,
	variant = 'ghost',
	className,
	...props
}: ButtonProps | LinkProps) {
	const content = (
		<>
			{icon}
			<span className='leading-[20rem]'>{children}</span>
		</>
	)

	if ('href' in props && props.href) {
		return (
			<Link
				href={props.href}
				className={styles(variant, className)}
			>
				{content}
			</Link>
		)
	}

	return (
		<button
			className={styles(variant, className)}
			{...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{content}
		</button>
	)
}
