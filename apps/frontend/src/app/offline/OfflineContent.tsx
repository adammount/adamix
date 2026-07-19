'use client'

import { WifiOff } from 'lucide-react'

export function OfflineContent() {
	return (
		<div className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-[16rem] text-center'>
			<div className='flex size-[64rem] items-center justify-center rounded-full border border-white-15 bg-white-15 backdrop-blur-[8rem] md:size-[80rem]'>
				<WifiOff className='size-[28rem] text-white-60 md:size-[36rem]' />
			</div>
			<div className='flex flex-col gap-[6rem]'>
				<p className='font-heading text-[20rem] text-white md:text-[24rem]'>
					You are offline
				</p>
				<p className='max-w-[320rem] text-[13rem] text-white-60 md:text-[14rem]'>
					Check your connection and try again. Some pages you have already
					visited may still be available.
				</p>
			</div>
			<button
				onClick={() => location.reload()}
				className='glass-pill h-[44rem] px-[24rem] text-[14rem] font-semibold'
			>
				Retry
			</button>
		</div>
	)
}
