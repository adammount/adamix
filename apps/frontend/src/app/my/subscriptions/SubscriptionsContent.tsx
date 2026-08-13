'use client'

import { EmptyState } from '@/ui/EmptyState'
import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { SubscriptionCircle } from '@/ui/subscription-circle/SubscriptionCircle'
import { VideoCard } from '@/ui/video-card/VideoCard'

import { useProfile } from '@/hooks/useProfile'

export function SubscriptionsContent() {
	const { profile, isLoading } = useProfile()

	const subscriptions = profile?.subscriptions || []
	const videos = profile?.subscribedVideos || []

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<div className='flex flex-col gap-[20rem] md:gap-[16rem]'>
				<PageHeading className='text-[30rem] md:text-[36rem]'>Subscriptions</PageHeading>
				{!!subscriptions.length && (
					<div className='-mx-[8rem] flex gap-[16rem] overflow-x-auto px-[8rem] [scrollbar-width:none] md:mx-0 md:flex-wrap md:gap-[24rem] md:px-0 [&::-webkit-scrollbar]:hidden'>
						{subscriptions.map(channel => (
							<SubscriptionCircle
								key={channel.id}
								channel={channel}
							/>
						))}
					</div>
				)}
			</div>

			<div className='flex flex-wrap gap-[12rem] md:gap-[18rem]'>
				{isLoading ? (
					<SkeletonLoader
						count={8}
						className='h-[280rem] w-full rounded-[20rem] md:h-[246rem] md:w-[278rem] md:rounded-[28rem]'
					/>
				) : videos.length ? (
					videos.map(video => (
						<VideoCard
							key={video.id}
							video={video}
						/>
					))
				) : (
					<EmptyState
						title='No subscriptions yet'
						description='Subscribe to channels to see their latest videos here'
					/>
				)}
			</div>
		</section>
	)
}
