import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { memo } from 'react'

interface BaseProps {
	icon: LucideIcon
	label: string
	isActive?: boolean
}

type Props = BaseProps & ({ href: string } | { onClick: () => void })

export const SidebarItem = memo(function SidebarItem({
	icon: Icon,
	label,
	isActive,
	...rest
}: Props) {
	const className = cn(
		'menuLink transition-base flex w-full items-center gap-[12rem] rounded-[24rem] p-[8rem] text-[16rem] font-medium',
		isActive
			? 'bg-white-25 text-white backdrop-blur-[8rem]'
			: 'text-white-60 hover-desktop:bg-white-15 hover-desktop:text-white'
	)

	const content = (
		<>
			<span className='flex size-[24rem] shrink-0 items-center justify-center'>
				<Icon
					className='size-[16rem]'
					aria-hidden='true'
				/>
			</span>
			<span className='menuLabel'>{label}</span>
		</>
	)

	if ('href' in rest)
		return (
			<Link
				href={rest.href}
				title={label}
				aria-current={isActive ? 'page' : undefined}
				className={className}
			>
				{content}
			</Link>
		)

	return (
		<button
			onClick={rest.onClick}
			className={className}
		>
			{content}
		</button>
	)
})
