'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { EmptyState } from '@/ui/EmptyState'
import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoCard } from '@/ui/video-card/VideoCard'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useIsClient } from '@/hooks/useIsClient'

import { videoService } from '@/services/video.service'

const LIMIT = 30

export function SearchContent() {
	const isClient = useIsClient()
	const searchParams = useSearchParams()
	const term = searchParams.get('term') ?? ''

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: QUERY_KEYS.SEARCH(term),
		queryFn: async ({ pageParam }) => {
			const res = await videoService.getAll(term, {
				page: pageParam,
				limit: LIMIT
			})
			return res.data
		},
		initialPageParam: 1,
		getNextPageParam: lastPage =>
			lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
		enabled: !!term
	})

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })

	const videos = data?.pages.flatMap(page => page.videos) ?? []

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<PageHeading className='text-[30rem] md:text-[36rem]'>Search “{term}”</PageHeading>

			<div className='flex flex-wrap gap-[12rem] md:gap-[18rem]'>
				{!isClient || (isLoading && !videos.length) ? (
					<SkeletonLoader
						count={5}
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
								count={5}
								className='h-[280rem] w-full rounded-[20rem] md:h-[246rem] md:w-[278rem] md:rounded-[28rem]'
							/>
						)}
					</>
				) : (
					<EmptyState
						title='Nothing found'
						description='Try a different search query'
					/>
				)}
			</div>
		</section>
	)
}
