'use client'

import { useMemo, useState } from 'react'

import { EmptyState } from '@/ui/EmptyState'
import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoRow } from '@/ui/video-card/VideoRow'

import { useEffectScroll } from '@/hooks/useEffectScroll'
import { useIsClient } from '@/hooks/useIsClient'
import { useWatchHistory } from '@/hooks/useWatchHistory'

import { groupByDay } from '@/utils/group-by-day'

import { HistoryControlsAside } from './HistoryControlsAside'

export function HistoryContent() {
	const isClient = useIsClient()
	const {
		history,
		count,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		clearHistory,
		isClearing
	} = useWatchHistory()
	const [searchTerm, setSearchTerm] = useState('')

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })

	const groups = useMemo(() => {
		const filtered = searchTerm.trim()
			? history.filter(item =>
					item.video.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
				)
			: history

		return groupByDay(filtered, item => item.watchedAt)
	}, [history, searchTerm])

	return (
		<section className='flex flex-col gap-[20rem] md:flex-row md:items-start md:justify-between md:gap-[24rem]'>
			<PageHeading className='text-[30rem] md:hidden'>History</PageHeading>

			<div className='md:hidden'>
				<HistoryControlsAside
					count={count}
					searchTerm={searchTerm}
					onSearch={setSearchTerm}
					onClear={clearHistory}
					isClearing={isClearing}
				/>
			</div>

			<div className='flex min-w-0 flex-1 flex-col gap-[36rem]'>
				<PageHeading className='hidden md:block'>History</PageHeading>
				<div className='flex flex-col gap-[20rem]'>
					{!isClient || (isLoading && !history.length) ? (
						<SkeletonLoader
							count={3}
							className='aspect-[278/174] w-full rounded-[20rem] md:aspect-auto md:h-[174rem] md:w-[278rem] md:rounded-[28rem]'
						/>
					) : groups.length ? (
						<>
							{groups.map(group => (
								<div
									key={group.label}
									className='flex flex-col gap-[20rem]'
								>
									<h2 className='font-heading text-[18rem] text-white/80'>{group.label}</h2>
									{group.items.map(item => (
										<VideoRow
											key={item.id}
											video={item.video}
										/>
									))}
								</div>
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
							title='No watch history yet'
							description='Videos you watch will appear here'
						/>
					)}
				</div>
			</div>

			<div className='hidden md:sticky md:top-[16rem] md:block'>
				<HistoryControlsAside
					count={count}
					searchTerm={searchTerm}
					onSearch={setSearchTerm}
					onClear={clearHistory}
					isClearing={isClearing}
				/>
			</div>
		</section>
	)
}
