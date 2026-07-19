'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { EmptyState } from '@/ui/EmptyState'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { RecommendedCard } from '../../home/RecommendedCard'
import { useEffectScroll } from '@/hooks/useEffectScroll'
import { categoryService } from '@/services/category.service'

const LIMIT = 30

export function CategoryVideos({ slug }: { slug: string }) {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: ['category-videos', slug],
			queryFn: async ({ pageParam }) => {
				const res = await categoryService.getBySlug(slug, {
					page: pageParam,
					limit: LIMIT
				})
				return res.data
			},
			initialPageParam: 1,
			getNextPageParam: lastPage =>
				lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined
		})

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })

	const videos = data?.pages.flatMap(page => page.videos) || []

	if (isLoading && !videos.length)
		return (
			<div className='grid grid-cols-1 gap-[12rem] md:grid-cols-5 md:gap-[8rem]'>
				<SkeletonLoader
					count={10}
					className='h-[280rem] rounded-[20rem] md:h-[202rem] md:rounded-[28rem]'
				/>
			</div>
		)

	if (!videos.length)
		return <EmptyState title='No videos in this category yet' />

	return (
		<div className='grid grid-cols-1 gap-[12rem] md:grid-cols-5 md:gap-[8rem]'>
			{videos.map(video => (
				<RecommendedCard
					key={video.id}
					video={video}
				/>
			))}
			{isFetchingNextPage && (
				<SkeletonLoader
					count={5}
					className='h-[280rem] rounded-[20rem] md:h-[202rem] md:rounded-[28rem]'
				/>
			)}
		</div>
	)
}
