'use client'

import cn from 'clsx'
import { Check, Paperclip } from 'lucide-react'
import { useState } from 'react'

import { Modal } from '@/ui/modal/Modal'

export function FeedbackModal({ onClose }: { onClose: () => void }) {
	const [text, setText] = useState('')
	const [withScreenshot, setWithScreenshot] = useState(true)

	const send = async () => {
		onClose()
		setText('')
		const { toast } = await import('react-hot-toast')
		toast.success('Thanks for your feedback!')
	}

	return (
		<Modal
			title='Send Feedback'
			onClose={onClose}
			className='w-[672rem] max-w-full'
		>
			<textarea
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder='Type your feedback here...'
				className='transition-base h-[198rem] w-full resize-none rounded-[16rem] border border-white-15 bg-black-60 p-[17rem] text-[12rem] text-white outline-none placeholder:text-white-60 focus:border-brown-light md:rounded-[20rem] md:text-[14rem]'
			/>

			<div className='flex items-center justify-between'>
				<button
					onClick={() => setWithScreenshot(prev => !prev)}
					className='group transition-fast flex items-center gap-[8rem] text-[12rem] text-white-60 hover-desktop:text-white md:text-[14rem]'
				>
					<span
						className={cn(
							'transition-base flex size-[20rem] items-center justify-center rounded-[6rem] border border-white-15',
							withScreenshot ? 'bg-brown-light' : 'bg-white-15 group-hover:bg-white-25'
						)}
					>
						{withScreenshot && <Check className='size-[12rem] text-dark-brown' />}
					</span>
					<span className='flex items-center gap-[6rem]'>
						<Paperclip className='size-[14rem]' />
						Include screenshot
					</span>
				</button>

				<button
					onClick={send}
					disabled={!text.trim()}
					className='transition-base not-disabled:hover-desktop:bg-white-25 disabled-state flex h-[28rem] items-center rounded-[24rem] border border-white-15 bg-white-15 px-[17rem] text-[12rem] text-white md:h-[36rem] md:px-[21rem] md:text-[14rem]'
				>
					Send
				</button>
			</div>
		</Modal>
	)
}
