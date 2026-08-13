'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicRecommendedList = dynamic(
	() => import('./RecommendedList').then(mod => mod.RecommendedList),
	{
		ssr: false,
		loading: () => (
			<div className='grid grid-cols-1 gap-[12rem] md:grid-cols-5 md:gap-[8rem]'>
				<SkeletonLoader
					count={5}
					className='h-[280rem] rounded-[20rem] md:h-[202rem] md:rounded-[28rem]'
				/>
			</div>
		)
	}
)

export function RecommendedSection() {
	return (
		<section className='flex flex-col gap-[8rem] pb-[20rem]'>
			<h2 className='font-heading text-[18rem] text-white/80'>Recommended for You</h2>
			<DynamicRecommendedList />
		</section>
	)
}
