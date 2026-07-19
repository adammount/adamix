'use client'

import cn from 'clsx'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { VideoPlayer } from '@/ui/video-player/VideoPlayer'

import { transformCount } from '@/utils/transform-count'

import { VideoAside } from './VideoAside'
import { useUpdateViews } from './useUpdateViews'
import { VideoActions } from './video-actions/VideoActions'
import { VideoChannel } from './video-channel/VideoChannel'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicComments = dynamic(() =>
	import('./comments/Comments').then(mod => mod.Comments)
)

interface Props {
	video: ISingleVideoResponse
}

export function SingleVideo({ video }: Props) {
	const [isTheaterMode, setIsTheaterMode] = useState(false)

	useUpdateViews({ video })

	return (
		<section className='flex flex-col items-start gap-[12rem] md:flex-row md:gap-[16rem]'>
			<div className='flex w-full min-w-0 flex-1 flex-col gap-[12rem]'>
				<div className={cn(isTheaterMode ? 'absolute left-0 top-0 w-full' : 'relative')}>
					<VideoPlayer
						fileName={video.videoFileName}
						toggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
						maxResolution={video.maxResolution}
					/>
				</div>

				<div className='flex flex-col gap-[12rem] px-[8rem] md:px-0'>
					<div
						className={cn(
							'flex flex-col gap-[6rem] md:flex-row md:items-start md:justify-between md:gap-[16rem]',
							{ 'pt-[55rem]': isTheaterMode }
						)}
					>
						<div className='flex min-w-0 flex-col gap-[2rem]'>
							<h1 className='max-w-[500rem] font-heading text-[22rem] font-semibold text-white md:text-[30rem]'>
								{video.title}
							</h1>
							<p className='text-[10rem] text-white-40 md:text-[12rem]'>
								{transformCount(video.viewsCount)} views
							</p>
						</div>
						<div className='shrink-0'>
							<VideoActions video={video} />
						</div>
					</div>

					<VideoChannel video={video} />

					<DynamicComments video={video} />
				</div>
			</div>

			<VideoAside video={video} />
		</section>
	)
}
