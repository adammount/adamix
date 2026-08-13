'use client'

import { EmptyState } from '@/ui/EmptyState'
import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoRow } from '@/ui/video-card/VideoRow'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useIsClient } from '@/hooks/useIsClient'
import { useLikedVideos } from '@/hooks/useLikedVideos'

import { transformFullDate } from '@/utils/transform-date'

import { LikedPlaylistAside } from './LikedPlaylistAside'

export function LikedVideosContent() {
	const isClient = useIsClient()
	const { count, videos, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useLikedVideos()

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })

	return (
		<section className='flex flex-col gap-[20rem] md:flex-row md:items-start md:justify-between md:gap-[24rem]'>
			<PageHeading className='text-[30rem] md:hidden'>Liked videos</PageHeading>

			<div className='md:hidden'>
				<LikedPlaylistAside
					count={count}
					videos={videos}
				/>
			</div>

			<div className='flex flex-col gap-[36rem]'>
				<PageHeading className='hidden md:block'>Liked videos</PageHeading>
				<div className='flex flex-col gap-[20rem]'>
					{!isClient || (isLoading && !videos.length) ? (
						<SkeletonLoader
							count={4}
							className='aspect-[278/174] w-full rounded-[20rem] md:aspect-auto md:h-[174rem] md:w-[278rem] md:rounded-[28rem]'
						/>
					) : videos.length ? (
						<>
							{videos.map(video => (
								<VideoRow
									key={video.id}
									video={video}
									caption={`Liked on ${transformFullDate(video.likedAt)}`}
								/>
							))}
							{isFetchingNextPage && (
								<SkeletonLoader
									count={2}
									className='aspect-[278/174] w-full rounded-[20rem] md:aspect-auto md:h-[174rem] md:w-[278rem] md:rounded-[28rem]'
								/>
							)}
						</>
					) : (
						<EmptyState
							title='No liked videos yet'
							description='Videos you like will appear here'
						/>
					)}
				</div>
			</div>

			<div className='hidden md:sticky md:top-[16rem] md:block'>
				<LikedPlaylistAside
					count={count}
					videos={videos}
				/>
			</div>
		</section>
	)
}
