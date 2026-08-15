'use client'

import { type MouseEvent, type ReactNode } from 'react'

import { notifyNotImplemented } from '@/utils/notify-not-implemented'

interface Props {
	children: ReactNode
}

export function NotImplemented({ children }: Props) {
	const handleCapture = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		notifyNotImplemented()
	}

	return (
		<div
			onClickCapture={handleCapture}
			className='relative cursor-not-allowed [&_*]:pointer-events-none [&_*]:opacity-60'
		>
			{children}
		</div>
	)
}
