'use client'

import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

import { VideoPlayer } from '@/ui/video-player/VideoPlayer'

import { PAGE } from '@/config/public-page.config'

import { useUserSettings } from '@/hooks/useUserSettings'

import { transformCount } from '@/utils/transform-count'

import { VideoAside } from './VideoAside'
import { useUpdateViews } from './useUpdateViews'
import { VideoActions } from './video-actions/VideoActions'
import { VideoChannel } from './video-channel/VideoChannel'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicComments = dynamic(() => import('./comments/Comments').then(mod => mod.Comments))

interface Props {
	video: ISingleVideoResponse
}

export function SingleVideo({ video }: Props) {
	const [isTheaterMode, setIsTheaterMode] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()
	const { settings } = useUserSettings()

	useUpdateViews({ video })

	const shouldAutoPlay = searchParams.get('autoplay') === '1'
	const nextVideo = video.similarVideos[0]

	const handleEnded = useCallback(() => {
		if (!settings?.autoplay || !nextVideo) return
		router.push(`${PAGE.VIDEO(nextVideo.publicId)}?autoplay=1`)
	}, [settings?.autoplay, nextVideo, router])

	return (
		<section className='flex flex-col items-start gap-[12rem] md:flex-row md:gap-[16rem]'>
			<div className='flex w-full min-w-0 flex-1 flex-col gap-[12rem]'>
				<div className='relative'>
					<VideoPlayer
						fileName={video.videoFileName}
						toggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
						maxResolution={video.maxResolution}
						onEnded={handleEnded}
						shouldAutoPlay={shouldAutoPlay}
					/>
				</div>

				<div className='flex flex-col gap-[12rem] px-[8rem] md:px-0'>
					<div className='flex flex-col gap-[6rem] md:flex-row md:items-start md:justify-between md:gap-[16rem]'>
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

			{!isTheaterMode && <VideoAside video={video} />}
		</section>
	)
}
