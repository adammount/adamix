'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'
import { useEffectScroll } from '@/hooks/useEffectScroll'

import { RecommendedCard } from './RecommendedCard'
import { videoService } from '@/services/video.service'

export function RecommendedList() {
	const { user } = useAuth()

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['explore'],
		queryFn: ({ pageParam }) =>
			videoService.getExploreVideos(
				user?.id,
				{
					page: pageParam.page,
					limit: 10
				},
				pageParam.excludeIds
			),
		initialPageParam: { page: 1, excludeIds: [] as string[] },
		getNextPageParam: (lastPage, allPages) => {
			const { page, totalPages } = lastPage
			const allVideoIds = allPages.flatMap(page => page.videos.map(video => video.id))

			return page < totalPages ? { page: page + 1, excludeIds: allVideoIds } : undefined
		}
	})

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	const allVideos = data?.pages.flatMap(page => page.videos) || []

	return (
		<div className='grid grid-cols-1 gap-[12rem] md:grid-cols-5 md:gap-[8rem]'>
			{isLoading && !allVideos.length ? (
				<SkeletonLoader
					count={5}
					className='h-[202rem] rounded-[28rem]'
				/>
			) : (
				allVideos.map(video => (
					<RecommendedCard
						key={video.id}
						video={video}
					/>
				))
			)}

			{isFetchingNextPage && (
				<SkeletonLoader
					count={5}
					className='h-[202rem] rounded-[28rem]'
				/>
			)}
		</div>
	)
}
