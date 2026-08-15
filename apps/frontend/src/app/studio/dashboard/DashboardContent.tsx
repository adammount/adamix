'use client'

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar } from '@/ui/Avatar'
import { PageHeading } from '@/ui/PageHeading'
import { PlayOverlay } from '@/ui/PlayOverlay'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

import { PAGE } from '@/config/public-page.config'

import { useIsClient } from '@/hooks/useIsClient'

import { getAvatarUrl } from '@/utils/get-placeholder-image'
import { transformCount } from '@/utils/transform-count'
import { transformDate, transformFullDate } from '@/utils/transform-date'

import { AnalyticsChart } from './AnalyticsChart'
import { useDashboard } from './useDashboard'

function StatCard({ title, value }: { title: string; value: string }) {
	return (
		<div className='flex flex-col justify-center gap-[4rem] rounded-[20rem] border border-brown-light bg-white-15 px-[13rem] py-[17rem] backdrop-blur-[8rem] md:rounded-[28rem] md:p-[21rem]'>
			<span className='font-heading text-[18rem] font-bold text-white'>{title}</span>
			<span className='font-heading text-[36rem] font-bold leading-[40rem] text-white md:font-medium'>
				{value}
			</span>
		</div>
	)
}

function Metric({ title, value }: { title: string; value: string }) {
	return (
		<div className='flex flex-col gap-[4rem]'>
			<span className='text-[12rem] font-bold text-white-60'>{title}</span>
			<span className='font-heading text-[20rem] leading-[28rem] text-white'>{value}</span>
		</div>
	)
}

export function DashboardContent() {
	const isClient = useIsClient()
	const { dashboard, isLoading } = useDashboard()

	if (!isClient || isLoading || !dashboard) {
		return (
			<div className='flex flex-col gap-[20rem] md:gap-[36rem]'>
				<PageHeading className='text-[30rem] font-bold md:text-[36rem]'>Dashboard</PageHeading>
				<SkeletonLoader
					count={1}
					className='h-[600rem] w-full rounded-[24rem] md:rounded-[40rem]'
				/>
			</div>
		)
	}

	const { latestVideo } = dashboard

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<h1 className='font-heading text-[30rem] font-bold leading-[40rem] text-white/80 md:text-[36rem]'>
				Dashboard
			</h1>

			<div className='flex flex-col gap-[12rem] md:flex-row md:items-start'>
				<div className='contents md:flex md:min-w-0 md:flex-1 md:flex-col md:gap-[12rem]'>
					<div className='order-1 grid grid-cols-1 gap-[12rem] md:order-none md:grid-cols-3'>
						<StatCard
							title='Total Subscribers'
							value={transformCount(dashboard.totalSubscribers)}
						/>
						<StatCard
							title='Views (last 28 days)'
							value={transformCount(dashboard.chart.reduce((sum, point) => sum + point.views, 0))}
						/>
						<StatCard
							title='Revenue'
							value='$4,500.00'
						/>
					</div>

					<div className='glass order-3 flex flex-col gap-[16rem] rounded-[24rem] px-[13rem] py-[17rem] md:order-none md:rounded-[40rem] md:p-[21rem]'>
						<h2 className='font-heading text-[18rem] font-bold text-white'>
							Latest Video Performance
						</h2>

						{latestVideo ? (
							<>
								<div className='flex flex-col gap-[12rem] md:flex-row md:gap-[24rem]'>
									<Link
										href={PAGE.VIDEO(latestVideo.publicId)}
										className='group relative aspect-video w-full shrink-0 overflow-hidden rounded-[16rem] md:aspect-auto md:h-[297rem] md:w-[528rem] md:rounded-[24rem]'
									>
										<Image
											src={latestVideo.thumbnailUrl}
											alt={latestVideo.title}
											fill
											sizes='(max-width: 767px) 100vw, 528px'
											className='object-cover transition-transform duration-500 group-hover:scale-105'
										/>
										<PlayOverlay />
									</Link>

									<div className='flex min-w-0 flex-1 flex-col gap-[16rem] rounded-[16rem] border border-white-15 bg-white-15 p-[17rem] backdrop-blur-[10rem] md:rounded-[32rem]'>
										<div className='flex flex-col gap-[2rem]'>
											<span className='font-heading text-[18rem] font-bold text-white'>
												All videos
											</span>
											<span className='text-[12rem] font-bold text-white-60'>
												{dashboard.videos.length} videos
											</span>
										</div>
										<span className='divider' />
										<div className='flex flex-wrap justify-center gap-[12rem]'>
											{dashboard.videos.map((video, index) => (
												<Link
													key={video.id}
													href={PAGE.VIDEO(video.publicId)}
													className={cn(
														'flex flex-col items-center gap-[8rem]',
														index === 0 ? 'w-full' : 'w-[calc(50%-6rem)]'
													)}
												>
													<div className='relative size-[64rem] overflow-hidden rounded-[16rem]'>
														<Image
															src={video.thumbnailUrl}
															alt={video.title}
															fill
															sizes='64px'
															className='object-cover'
														/>
													</div>
													<div className='flex flex-col items-center gap-[4rem] text-center'>
														<span className='line-clamp-1 w-full text-[14rem] font-bold text-white'>
															{video.title}
														</span>
														<span className='text-[9rem] font-bold text-white-60'>
															Upload on {transformFullDate(video.createdAt)}
														</span>
													</div>
												</Link>
											))}
										</div>
									</div>
								</div>

								<span className='divider' />

								<div className='flex flex-col gap-[12rem] md:flex-row md:items-end md:justify-between'>
									<div className='flex flex-col gap-[4rem]'>
										<span className='font-heading text-[18rem] font-bold text-white'>
											{latestVideo.title}
										</span>
										<span className='text-[14rem] font-bold text-white-60'>
											{transformCount(latestVideo.viewsCount)} views
										</span>
									</div>
									<div className='flex justify-between gap-[24rem] md:justify-start md:gap-[36rem]'>
										<Metric
											title='Views'
											value={transformCount(latestVideo.viewsCount)}
										/>
										<Metric
											title='Time'
											value='30K'
										/>
										<Metric
											title='Likes'
											value={transformCount(latestVideo._count.likes)}
										/>
										<Metric
											title='Comments'
											value={transformCount(latestVideo._count.comments)}
										/>
									</div>
								</div>
							</>
						) : (
							<p className='text-[14rem] text-white-60'>No videos uploaded yet</p>
						)}
					</div>
				</div>

				<div className='contents md:flex md:w-[300rem] md:shrink-0 md:flex-col md:gap-[12rem]'>
					<div className='order-2 flex flex-col gap-[16rem] rounded-[24rem] border border-white-15 bg-white-15/5 px-[13rem] py-[17rem] backdrop-blur-[8rem] md:order-none md:p-[21rem]'>
						<h2 className='font-heading text-[18rem] font-bold text-white-60'>Channel Analytics</h2>
						<AnalyticsChart />
						<div className='flex justify-center gap-[16rem]'>
							<span className='flex items-center gap-[4rem] text-[12rem] font-semibold text-white'>
								<span className='size-[8rem] rounded-full bg-[#60a5fa] shadow-[0_0_8rem_0_#60a5fa]' />
								Views
							</span>
						</div>
					</div>

					<div className='glass order-4 flex flex-col gap-[16rem] rounded-[24rem] px-[13rem] py-[17rem] md:order-none md:p-[21rem]'>
						<h2 className='font-heading text-[18rem] font-bold text-white'>Recent Comments</h2>
						<div className='flex flex-col gap-[16rem]'>
							{dashboard.recentComments.map(comment => (
								<div
									key={comment.id}
									className='flex items-start gap-[12rem]'
								>
									<Avatar
										src={getAvatarUrl(comment.user.channel?.avatarUrl, comment.id, 84)}
										name={comment.user.name}
										size={42}
									/>
									<div className='flex min-w-0 flex-col gap-[2rem]'>
										<div className='flex w-full items-baseline justify-between gap-[8rem]'>
											<span className='line-clamp-1 text-[14rem] font-bold text-white'>
												{comment.user.name}
											</span>
											<span className='shrink-0 text-[9rem] font-bold text-white-40'>
												{transformDate(comment.createdAt)}
											</span>
										</div>
										<p className='line-clamp-2 text-[14rem] font-bold leading-[22rem] text-white-60'>
											{comment.text}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
