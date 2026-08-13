import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { transformDuration } from '@/utils/transform-duration'

import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	index: number
}

export function PlaylistTrackRow({ video, index }: Props) {
	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='group flex w-full items-center gap-[12rem] rounded-[16rem] glass p-[13rem] transition-base hover-desktop:bg-white-25 md:rounded-[28rem] md:p-[17rem]'
		>
			<span className='w-[16rem] shrink-0 text-center text-[16rem] font-medium text-white'>
				{index}
			</span>
			<div className='relative h-[64rem] w-[128rem] shrink-0 overflow-hidden rounded-[12rem] md:rounded-[16rem]'>
				<Image
					src={video.thumbnailUrl}
					alt={video.title}
					fill
					sizes='128px'
					className='object-cover transition-transform duration-500 group-hover:scale-105'
				/>
			</div>
			<div className='flex min-w-0 flex-1 flex-col gap-[2rem]'>
				<h3 className='line-clamp-1 font-heading text-[18rem] text-white'>{video.title}</h3>
				<p className='line-clamp-1 text-[12rem] leading-[18rem] text-white-60 md:text-[14rem] md:leading-[22rem]'>
					{video.channel?.user?.name}
				</p>
			</div>
			<span className='shrink-0 text-[16rem] font-medium text-white-60'>
				{transformDuration(video.duration)}
			</span>
		</Link>
	)
}
