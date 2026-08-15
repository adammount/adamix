import Image from 'next/image'
import Link from 'next/link'

import { Avatar } from '@/ui/Avatar'
import { ChannelName } from '@/ui/ChannelName'

import { PAGE } from '@/config/public-page.config'

import { getAvatarUrl } from '@/utils/get-placeholder-image'
import { transformCount } from '@/utils/transform-count'

import type { IVideo } from '@/types/video.types'

export function TrendingCard({ video }: { video: IVideo }) {
	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='group relative flex h-[184rem] w-[324rem] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[16rem] md:rounded-[24rem]'
		>
			<Image
				src={video.thumbnailUrl}
				alt={video.title}
				fill
				sizes='324px'
				className='object-cover transition-transform duration-500 group-hover:scale-105'
				priority
			/>

			<div className='relative flex h-[67rem] flex-col justify-center gap-[4rem] bg-white-25 px-[8rem] backdrop-blur-[8rem]'>
				<h3 className='line-clamp-1 font-heading text-[14rem] font-semibold text-white'>
					{video.title}
				</h3>
				<div className='flex items-center gap-[4rem]'>
					<Avatar
						src={getAvatarUrl(video.channel?.avatarUrl, video.channel?.slug || video.id, 56)}
						name={video.channel?.user?.name}
						size={28}
					/>
					<div className='flex flex-col gap-[2rem]'>
						<ChannelName
							channel={video.channel}
							className='text-[9rem] text-white'
							verifiedClassName='size-[8rem]'
						/>
						<span className='text-[7rem] text-white-60'>
							{transformCount(video.viewsCount)} views
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
