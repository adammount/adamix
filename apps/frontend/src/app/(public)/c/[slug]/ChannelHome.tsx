import Image from 'next/image'
import Link from 'next/link'

import { DurationBadge } from '@/ui/DurationBadge'
import { EmptyState } from '@/ui/EmptyState'
import { PlayOverlay } from '@/ui/PlayOverlay'
import { VideoThumbnail } from '@/ui/VideoThumbnail'

import { PAGE } from '@/config/public-page.config'

import { stripHtml } from '@/utils/strip-html'
import { transformCount } from '@/utils/transform-count'
import { transformFullDate } from '@/utils/transform-date'
import { transformDuration } from '@/utils/transform-duration'

import type { IVideo } from '@/types/video.types'

function UploadRow({ video }: { video: IVideo }) {
	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='group flex items-start gap-[8rem]'
		>
			<VideoThumbnail
				src={video.thumbnailUrl}
				alt={video.title}
				sizes='180px'
				rounded='rounded-[16rem]'
				className='h-[101rem] w-[180rem] shrink-0'
			>
				<DurationBadge className='bottom-[8rem] right-[8rem]'>
					{transformDuration(video.duration)}
				</DurationBadge>
			</VideoThumbnail>
			<div className='flex min-w-0 flex-1 flex-col gap-[4rem] self-stretch'>
				<h3 className='line-clamp-2 font-heading text-[14rem] font-semibold text-white'>
					{video.title}
				</h3>
				<div className='flex items-center gap-[4rem] text-[9rem] text-white-60'>
					<span>{transformCount(video.viewsCount)} views</span>
					<span className='size-[4rem] rounded-full bg-white-60' />
					<span>{transformFullDate(video.createdAt)}</span>
				</div>
			</div>
		</Link>
	)
}

export function ChannelHome({ videos }: { videos: IVideo[] }) {
	const featured = videos[0]
	const recent = videos.slice(0, 3)

	if (!featured) {
		return <EmptyState title='No videos on this channel yet' />
	}

	return (
		<div className='grid grid-cols-1 items-start gap-[16rem] md:grid-cols-3 md:gap-[32rem]'>
			<div className='md:col-span-2'>
				<div className='glass flex flex-col gap-[12rem] rounded-[24rem] p-[13rem] backdrop-blur-[16rem] md:flex-row md:gap-[16rem] md:rounded-[40rem] md:p-[17rem]'>
					<Link
						href={PAGE.VIDEO(featured.publicId)}
						className='group relative aspect-video w-full shrink-0 overflow-hidden rounded-[20rem] md:aspect-auto md:h-[236rem] md:w-[420rem] md:rounded-[24rem]'
					>
						<Image
							src={featured.thumbnailUrl}
							alt={featured.title}
							fill
							sizes='420px'
							className='object-cover transition-transform duration-500 group-hover:scale-105'
						/>
						<PlayOverlay />
					</Link>
					<div className='flex min-w-0 flex-1 flex-col gap-[8rem]'>
						<div className='flex flex-col gap-[4rem]'>
							<h2 className='line-clamp-2 font-heading text-[18rem] text-white'>
								{featured.title}
							</h2>
							<div className='flex items-center gap-[8rem] text-[12rem] text-white-60'>
								<span>{transformCount(featured.viewsCount)} views</span>
								<span className='size-[4rem] rounded-full bg-white-60' />
								<span>{transformFullDate(featured.createdAt)}</span>
							</div>
						</div>
						<p className='line-clamp-4 text-[14rem] leading-[22rem] text-white-60'>
							{stripHtml(featured.description)}
						</p>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-[12rem] rounded-[24rem] border border-white-15 bg-white-15 px-[12rem] py-[16rem] md:rounded-[32rem] md:p-[16rem]'>
				<h2 className='font-heading text-[18rem] text-white'>Recent Uploads</h2>
				<span className='divider' />
				{recent.map(video => (
					<UploadRow
						key={video.id}
						video={video}
					/>
				))}
			</div>
		</div>
	)
}
