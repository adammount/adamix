import { memo } from 'react'

import { SidebarItem } from '@/components/layout/sidebar/SidebarItem'

import type { IMenuItemProps } from './menu.types'

export const MenuItem = memo(function MenuItem({ item, isActive }: IMenuItemProps) {
	return (
		<li>
			<SidebarItem
				href={item.link}
				icon={item.icon}
				label={item.label}
				isActive={isActive}
			/>
			{item.isBottomBorder && (
				<span className='block px-[8rem] py-[12rem]'>
					<span className='divider' />
				</span>
			)}
		</li>
	)
})
