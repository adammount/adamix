'use client'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { EmptyState } from '@/ui/EmptyState'
import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { TrendingTabs } from './TrendingTabs'
import { categoryService } from '@/services/category.service'
import { videoService } from '@/services/video.service'

const LIMIT = 30

export function TrendingPageContent() {
	const [activeCategory, setActiveCategory] = useState<string | null>(null)

	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAll(),
		select: res => res.data.map(category => ({ slug: category.slug, name: category.name }))
	})

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['trending', activeCategory],
		queryFn: async ({ pageParam }) => {
			if (activeCategory) {
				const res = await categoryService.getBySlug(activeCategory, {
					page: pageParam,
					limit: LIMIT
				})
				return res.data
			}

			const res = await videoService.getAll(null, {
				page: pageParam,
				limit: LIMIT
			})
			return res.data
		},
		initialPageParam: 1,
		getNextPageParam: lastPage =>
			lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
	})

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	const videos = data?.pages.flatMap(page => page.videos) || []

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<div className='flex flex-col gap-[20rem] md:gap-[16rem]'>
				<PageHeading className='text-[30rem] md:text-[36rem]'>Trending</PageHeading>
				<TrendingTabs
					tabs={categories || []}
					active={activeCategory}
					onChange={setActiveCategory}
				/>
			</div>

			<div className='flex flex-wrap gap-[12rem] md:gap-[18rem]'>
				{isLoading && !videos.length ? (
					<SkeletonLoader
						count={8}
						className='h-[280rem] w-full rounded-[20rem] md:h-[246rem] md:w-[278rem] md:rounded-[28rem]'
					/>
				) : videos.length ? (
					<>
						{videos.map(video => (
							<VideoCard
								key={video.id}
								video={video}
							/>
						))}
						{isFetchingNextPage && (
							<SkeletonLoader
								count={4}
								className='h-[280rem] w-full rounded-[20rem] md:h-[246rem] md:w-[278rem] md:rounded-[28rem]'
							/>
						)}
					</>
				) : (
					<EmptyState title='Nothing here yet' />
				)}
			</div>
		</section>
	)
}
