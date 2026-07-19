'use client'

import cn from 'clsx'
import { X } from 'lucide-react'
import { type ReactNode, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

import { useIsClient } from '@/hooks/useIsClient'

interface Props {
	title: string
	onClose: () => void
	children: ReactNode
	className?: string
}

export function Modal({ title, onClose, children, className }: Props) {
	const isClient = useIsClient()
	const titleId = useId()
	const dialogRef = useRef<HTMLDivElement>(null)
	const triggerRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		triggerRef.current = document.activeElement as HTMLElement

		const dialog = dialogRef.current
		dialog?.focus()

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
				return
			}

			if (e.key !== 'Tab' || !dialog) return

			const focusable = dialog.querySelectorAll<HTMLElement>(
				'a[href], button:not(:disabled), textarea:not(:disabled), input:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
			)
			if (!focusable.length) return

			const first = focusable[0]
			const last = focusable[focusable.length - 1]

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault()
				last.focus()
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			triggerRef.current?.focus()
		}
	}, [onClose])

	if (!isClient) return null

	return createPortal(
		<div
			role='presentation'
			onClick={e => {
				if (e.target === e.currentTarget) onClose()
			}}
			className='fixed inset-0 z-[100] flex items-center justify-center bg-black-60 p-[20rem]'
		>
			<div
				ref={dialogRef}
				role='dialog'
				aria-modal='true'
				aria-labelledby={titleId}
				tabIndex={-1}
				className={cn(
					'glass-strong relative flex max-h-[90dvh] flex-col gap-[20rem] overflow-y-auto rounded-[24rem] px-[13rem] py-[17rem] outline-none md:gap-[32rem] md:rounded-[40rem] md:p-[21rem]',
					className
				)}
			>
				<button
					onClick={onClose}
					title='Close'
					aria-label='Close dialog'
					className='transition-fast hover-desktop:text-white absolute right-[17rem] top-[17rem] text-white-60 md:right-[21rem] md:top-[21rem]'
				>
					<X className='size-[20rem]' />
				</button>
				<h2
					id={titleId}
					className='font-heading text-[30rem] font-semibold leading-[normal] text-white md:text-[36rem] md:font-medium md:leading-[40rem]'
				>
					{title}
				</h2>
				{children}
			</div>
		</div>,
		document.body
	)
}
