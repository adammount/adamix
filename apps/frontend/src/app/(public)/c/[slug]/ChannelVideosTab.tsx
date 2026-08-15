'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { EmptyState } from '@/ui/EmptyState'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { useEffectScroll } from '@/hooks/useEffectScroll'

import { videoService } from '@/services/video.service'

const LIMIT = 30

export function ChannelVideosTab({ channelId }: { channelId: string }) {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: QUERY_KEYS.CHANNEL_VIDEOS(channelId),
		queryFn: async ({ pageParam }) => {
			const res = await videoService.byChannel(channelId, {
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
			<div className='flex flex-wrap gap-[12rem] md:gap-[18rem]'>
				<SkeletonLoader
					count={8}
					className='h-[280rem] w-full rounded-[20rem] md:h-[246rem] md:w-[278rem] md:rounded-[28rem]'
				/>
			</div>
		)

	if (!videos.length) return <EmptyState title='No videos on this channel yet' />

	return (
		<div className='flex flex-wrap gap-[18rem]'>
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
		</div>
	)
}
