import Link from 'next/link'

import { ChannelName } from '@/ui/ChannelName'
import { VideoThumbnail } from '@/ui/VideoThumbnail'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'
import type { IVideo } from '@/types/video.types'

export function RecommendedCard({ video }: { video: IVideo }) {
	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='group flex flex-col gap-[4rem] overflow-hidden rounded-[20rem] glass px-[12rem] pb-[16rem] pt-[8rem] transition-base hover-desktop:bg-white-25 md:h-[202rem] md:rounded-[28rem] md:p-[8rem]'
		>
			<VideoThumbnail
				src={video.thumbnailUrl}
				alt={video.title}
				sizes='(max-width: 767px) 100vw, 212px'
				rounded='rounded-[16rem] md:rounded-[20rem]'
				className='h-[198rem] w-full md:h-[120rem]'
			/>
			<div className='flex flex-col gap-[2rem]'>
				<h3 className='line-clamp-1 font-heading text-[14rem] font-semibold text-white'>
					{video.title}
				</h3>
				<ChannelName
					channel={video.channel}
					className='text-[10rem] text-white-60'
					verifiedClassName='size-[6rem]'
				/>
				<span className='text-[9rem] text-white-60'>
					{transformCount(video.viewsCount)} views
				</span>
			</div>
		</Link>
	)
}
