'use client'

import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'

export interface TabItem<T extends string> {
	id: T
	label: string
	icon?: LucideIcon
}

interface Props<T extends string> {
	tabs: TabItem<T>[]
	active: T | null
	onChange: (id: T) => void
}

export function Tabs<T extends string>({ tabs, active, onChange }: Props<T>) {
	return (
		<div className='flex items-center gap-[8rem] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
			{tabs.map(tab => {
				const Icon = tab.icon
				const isActive = active === tab.id

				return (
					<button
						key={tab.id}
						onClick={() => onChange(tab.id)}
						aria-current={isActive ? 'true' : undefined}
						className={cn(
							'transition-base flex h-[28rem] shrink-0 items-center gap-[8rem] rounded-[24rem] border border-white-15 px-[17rem] text-[12rem] font-semibold backdrop-blur-[8rem] md:h-[36rem] md:px-[21rem] md:text-[14rem]',
							isActive
								? 'bg-white-15 text-white'
								: 'text-white-60 hover-desktop:bg-white-15 hover-desktop:text-white'
						)}
					>
						{Icon && (
							<Icon
								className='size-[12rem]'
								aria-hidden='true'
							/>
						)}
						<span>{tab.label}</span>
					</button>
				)
			})}
		</div>
	)
}
