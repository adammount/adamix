'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

import { TrendingCard } from './TrendingCard'
import type { IVideo } from '@/types/video.types'

export function TrendingSection({ videos }: { videos: IVideo[] }) {
	const scrollRef = useRef<HTMLDivElement>(null)

	const scroll = (direction: 'left' | 'right') => {
		const node = scrollRef.current
		if (!node) return
		const amount = node.clientWidth * 0.8
		node.scrollBy({
			left: direction === 'left' ? -amount : amount,
			behavior: 'smooth'
		})
	}

	if (!videos.length) return null

	return (
		<section className='glass flex flex-col gap-[16rem] rounded-[24rem] py-[17rem] backdrop-blur-[16rem] md:gap-[20rem] md:rounded-[40rem] md:py-[25rem]'>
			<div className='flex items-center justify-between px-[13rem] md:px-[25rem]'>
				<h2 className='font-heading text-[18rem] text-white/80'>Trending</h2>
				<div className='flex items-center gap-[16rem]'>
					<button
						onClick={() => scroll('left')}
						aria-label='Scroll left'
						className='flex size-[20rem] items-center justify-center text-white-40 transition-fast hover-desktop:text-white'
					>
						<ChevronLeft className='size-[20rem]' />
					</button>
					<button
						onClick={() => scroll('right')}
						aria-label='Scroll right'
						className='flex size-[20rem] items-center justify-center text-white transition-fast hover-desktop:text-brown-light'
					>
						<ChevronRight className='size-[20rem]' />
					</button>
				</div>
			</div>

			<div
				ref={scrollRef}
				className='grid snap-x snap-mandatory grid-flow-col auto-cols-[324rem] gap-[16rem] overflow-x-auto px-[13rem] scroll-px-[13rem] [mask-image:linear-gradient(to_right,#000_calc(100%-13rem),transparent)] [scrollbar-width:none] md:px-[25rem] md:scroll-px-[25rem] md:[mask-image:linear-gradient(to_right,#000_calc(100%-25rem),transparent)] [&::-webkit-scrollbar]:hidden'
			>
				{videos.map(video => (
					<TrendingCard
						key={video.id}
						video={video}
					/>
				))}
			</div>
		</section>
	)
}
