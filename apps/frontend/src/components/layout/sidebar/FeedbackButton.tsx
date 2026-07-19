'use client'

import { CircleAlert } from 'lucide-react'
import { useState } from 'react'

import { SidebarItem } from '@/components/layout/sidebar/SidebarItem'

import { FeedbackModal } from './FeedbackModal'

export function FeedbackButton() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<SidebarItem
				icon={CircleAlert}
				label='Feedback'
				onClick={() => setIsOpen(true)}
			/>

			{isOpen && <FeedbackModal onClose={() => setIsOpen(false)} />}
		</>
	)
}
