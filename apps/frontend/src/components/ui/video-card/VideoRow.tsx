import Link from 'next/link'
import type { ReactNode } from 'react'

import { Avatar } from '@/ui/Avatar'
import { ChannelName } from '@/ui/ChannelName'
import { VideoThumbnail } from '@/ui/VideoThumbnail'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'

import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	caption?: ReactNode
}

export function VideoRow({ video, caption }: Props) {
	const subscribers = video.channel?._count?.subscribers ?? 0

	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='group flex flex-col gap-[12rem] md:flex-row md:items-center md:gap-[16rem]'
		>
			<div className='glass aspect-[278/174] w-full shrink-0 overflow-hidden rounded-[20rem] p-[8rem] md:aspect-auto md:h-[174rem] md:w-[278rem] md:rounded-[28rem]'>
				<VideoThumbnail
					src={video.thumbnailUrl}
					alt={video.title}
					sizes='(max-width: 767px) 100vw, 278px'
					rounded='rounded-[20rem]'
					className='h-full w-full md:h-[158rem]'
				/>
			</div>
			<div className='flex w-full flex-col gap-[8rem]'>
				<h3 className='line-clamp-1 font-heading text-[18rem] font-semibold text-white md:text-[30rem]'>
					{video.title}
				</h3>
				<div className='flex flex-col gap-[12rem]'>
					<div className='flex items-center gap-[4rem]'>
						<Avatar
							src={
								video.channel?.avatarUrl ||
								`https://picsum.photos/seed/${video.channel?.slug || video.id}/96/96`
							}
							name={video.channel?.user?.name}
							size={48}
						/>
						<div className='flex flex-col gap-[2rem]'>
							<ChannelName
								channel={video.channel}
								className='text-[16rem] font-medium text-white'
								verifiedClassName='size-[12rem]'
							/>
							<span className='text-[12rem] text-white-40'>
								{transformCount(subscribers)} subscribers
							</span>
						</div>
					</div>
					{caption && (
						<span className='text-right text-[14rem] text-white-60 md:text-left'>{caption}</span>
					)}
				</div>
			</div>
		</Link>
	)
}
