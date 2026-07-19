'use client'

import Image from 'next/image'
import Link from 'next/link'

import { DurationBadge } from '@/ui/DurationBadge'
import { Switch } from '@/ui/controls/Switch'

import { PAGE } from '@/config/public-page.config'

import { useUserSettings } from '@/hooks/useUserSettings'

import { stripHtml } from '@/utils/strip-html'
import { transformCount } from '@/utils/transform-count'
import { transformDuration } from '@/utils/transform-duration'
import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoAside({ video }: { video: ISingleVideoResponse }) {
	const { settings, update } = useUserSettings()

	if (!video.similarVideos.length) return null

	return (
		<aside className='mx-[8rem] flex shrink-0 flex-col self-stretch overflow-hidden rounded-[24rem] border border-white-15 bg-white-15 backdrop-blur-[16rem] md:mx-0 md:w-[360rem] md:self-auto md:rounded-[40rem]'>
			<div className='flex items-center justify-between px-[12rem] pb-[12rem] pt-[16rem] md:p-[16rem]'>
				<span className='font-heading text-[18rem] text-white'>Autoplay</span>
				<Switch
					checked={settings?.autoplay ?? false}
					onChange={value => update({ autoplay: value })}
				/>
			</div>

			<span className='mx-[16rem] h-[1rem] rounded-full bg-white-15' />

			<div className='flex flex-col gap-[12rem] px-[12rem] pb-[32rem] pt-[16rem] md:gap-[16rem] md:p-[16rem]'>
				{video.similarVideos.map(item => (
					<Link
						key={item.id}
						href={PAGE.VIDEO(item.publicId)}
						className='group flex items-start gap-[8rem]'
					>
						<div className='relative h-[90rem] w-[160rem] shrink-0 overflow-hidden rounded-[12rem]'>
							<Image
								src={item.thumbnailUrl}
								alt={item.title}
								fill
								sizes='160px'
								className='object-cover transition-transform duration-500 group-hover:scale-105'
							/>
							<DurationBadge className='bottom-[12rem] right-[12rem]'>
								{transformDuration(item.duration)}
							</DurationBadge>
						</div>
						<div className='flex min-w-0 flex-1 flex-col gap-[2rem]'>
							<h3 className='line-clamp-2 font-heading text-[14rem] font-semibold text-white'>
								{item.title}
							</h3>
							<p className='line-clamp-2 text-[10rem] text-white-60'>
								{stripHtml(item.description)}
							</p>
							<p className='text-[9rem] text-white-60'>
								{transformCount(item.viewsCount)} views
							</p>
						</div>
					</Link>
				))}
			</div>
		</aside>
	)
}
