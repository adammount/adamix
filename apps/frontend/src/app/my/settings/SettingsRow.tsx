import type { LucideIcon } from 'lucide-react'
import { type ReactNode, memo } from 'react'

interface Props {
	icon?: LucideIcon
	label: string
	description?: string
	children: ReactNode
}

export const SettingsRow = memo(function SettingsRow({
	icon: Icon,
	label,
	description,
	children
}: Props) {
	return (
		<div className='flex min-h-[36rem] items-center justify-between gap-[12rem]'>
			<div className='flex items-center gap-[12rem]'>
				{Icon && (
					<span className='flex size-[16rem] items-center justify-center text-white'>
						<Icon className='size-[16rem]' />
					</span>
				)}
				<div className='flex flex-col gap-[4rem]'>
					<span className='text-[14rem] text-white'>{label}</span>
					{description && <span className='text-[12rem] text-white-60'>{description}</span>}
				</div>
			</div>
			{children}
		</div>
	)
})
