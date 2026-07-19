import Link from 'next/link'

import { Avatar } from '@/ui/Avatar'
import { ChannelName } from '@/ui/ChannelName'
import { VideoThumbnail } from '@/ui/VideoThumbnail'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'
import type { IVideo } from '@/types/video.types'

export function VideoCard({ video }: { video: IVideo }) {
	const subscribers = video.channel?._count?.subscribers ?? 0

	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='group glass flex w-full flex-col gap-[4rem] overflow-hidden rounded-[20rem] px-[12rem] pb-[16rem] pt-[8rem] transition-base hover-desktop:bg-white-25 md:h-[246rem] md:w-[278rem] md:rounded-[28rem] md:p-[8rem]'
		>
			<VideoThumbnail
				src={video.thumbnailUrl}
				alt={video.title}
				sizes='(max-width: 767px) 100vw, 278px'
				rounded='rounded-[16rem] md:rounded-[20rem]'
				className='h-[198rem] w-full md:h-[158rem]'
			/>
			<div className='flex flex-col gap-[8rem]'>
				<h3 className='line-clamp-1 font-heading text-[18rem] text-white'>
					{video.title}
				</h3>
				<div className='flex items-center gap-[4rem]'>
					<Avatar
						src={
							video.channel?.avatarUrl ||
							`https://picsum.photos/seed/${video.channel?.slug || video.id}/72/72`
						}
						name={video.channel?.user?.name}
						size={36}
					/>
					<div className='flex flex-col gap-[2rem]'>
						<ChannelName
							channel={video.channel}
							className='text-[12rem] font-semibold text-white'
						/>
						<span className='text-[9rem] text-white-60'>
							{transformCount(subscribers)} subscribers
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
