import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface BaseProps {
	icon: LucideIcon
	label: string
	isActive?: boolean
	onNavigate: () => void
}

type Props = BaseProps & ({ href: string } | { onClick: () => void })

export function MobileMenuItem({ icon: Icon, label, isActive, onNavigate, ...rest }: Props) {
	const className = cn('menu-row', isActive && 'border-white-60 text-white')

	const content = (
		<>
			<span className='flex size-[24rem] shrink-0 items-center justify-center'>
				<Icon
					className='size-[16rem]'
					aria-hidden='true'
				/>
			</span>
			<span>{label}</span>
		</>
	)

	if ('href' in rest)
		return (
			<Link
				href={rest.href}
				onClick={onNavigate}
				aria-current={isActive ? 'page' : undefined}
				className={className}
			>
				{content}
			</Link>
		)

	return (
		<button
			onClick={() => {
				rest.onClick()
				onNavigate()
			}}
			className={className}
		>
			{content}
		</button>
	)
}
