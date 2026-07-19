import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page'

import { processHtmlContent } from '@/utils/process-html-content'
import { transformCount } from '@/utils/transform-count'
import { transformFullDate } from '@/utils/transform-date'

import { StudioActions } from './StudioActions'
import type { IFullVideo } from '@/types/video.types'

interface Props {
	video: IFullVideo
}

export function StudioVideoItem({ video }: Props) {
	const { initialContent } = processHtmlContent(video.description, 1)

	return (
		<div className='flex flex-col gap-[12rem] rounded-[20rem] glass p-[12rem] md:flex-row md:items-center md:gap-[16rem] md:rounded-[28rem]'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				target='_blank'
				className='relative aspect-video w-full shrink-0 overflow-hidden rounded-[16rem] md:aspect-auto md:h-[116rem] md:w-[206rem] md:rounded-[20rem]'
			>
				<Image
					src={video.thumbnailUrl}
					fill
					sizes='(max-width: 767px) 100vw, 206px'
					alt={video.title}
					className='object-cover'
				/>
			</Link>

			<div className='flex min-w-0 flex-1 flex-col gap-[4rem]'>
				<Link
					href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
					className='line-clamp-1 font-heading text-[18rem] text-white transition-fast hover-desktop:text-brown-light'
				>
					{video.title}
				</Link>
				<div className='line-clamp-1 text-[12rem] text-white-60'>
					{parse(initialContent)}
				</div>
				<div className='mt-[4rem] flex flex-wrap gap-x-[16rem] gap-y-[2rem] text-[12rem] text-white-40'>
					<span>{transformFullDate(video.createdAt)}</span>
					<span>{transformCount(video.viewsCount)} views</span>
					<span>{transformCount(video.comments.length)} comments</span>
					<span>{transformCount(video.likes.length)} likes</span>
				</div>
			</div>

			<StudioActions video={video} />
		</div>
	)
}
