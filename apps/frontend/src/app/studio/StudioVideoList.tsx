'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { StudioVideoItem } from '@/ui/studio-video-item/StudioVideoItem'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { studioVideoService } from '@/services/studio/studio-video.service'

export function StudioVideoList() {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: QUERY_KEYS.STUDIO_VIDEO_LIST,
		queryFn: ({ pageParam }) =>
			studioVideoService.getAll({
				page: pageParam.page,
				limit: 8
			}),
		initialPageParam: { page: 1 },
		getNextPageParam: lastPage => {
			const { page, totalPages } = lastPage

			return page < totalPages ? { page: page + 1 } : undefined
		}
	})

	useEffectScroll({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	})

	const allVideos = data?.pages.flatMap(page => page.videos) || []

	return (
		<div className='flex flex-col gap-[12rem]'>
			{isLoading && !allVideos.length ? (
				<SkeletonLoader
					count={3}
					className='h-[260rem] w-full rounded-[20rem] md:h-[140rem] md:rounded-[28rem]'
				/>
			) : (
				allVideos.map(video => (
					<StudioVideoItem
						key={video.id}
						video={video}
					/>
				))
			)}

			{isFetchingNextPage && (
				<SkeletonLoader
					count={3}
					className='h-[260rem] w-full rounded-[20rem] md:h-[140rem] md:rounded-[28rem]'
				/>
			)}
		</div>
	)
}
