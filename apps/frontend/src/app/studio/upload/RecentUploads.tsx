'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { studioVideoService } from '@/services/studio/studio-video.service'

export function RecentUploads() {
	const { data } = useQuery({
		queryKey: ['recent-uploads'],
		queryFn: () => studioVideoService.getAll({ page: 1, limit: 3 })
	})

	const videos = data?.videos ?? []

	if (!videos.length) return null

	return (
		<div className='flex flex-col gap-[16rem]'>
			<h2 className='font-heading text-[18rem] text-white'>Recent Uploads</h2>
			<div className='-mr-[13rem] flex snap-x snap-mandatory gap-[12rem] overflow-x-auto pr-[13rem] [scrollbar-width:none] md:mr-0 md:grid md:grid-cols-3 md:gap-[16rem] md:overflow-visible md:pr-0 [&::-webkit-scrollbar]:hidden'>
				{videos.map(video => (
					<Link
						key={video.id}
						href={PAGE.VIDEO(video.publicId)}
						className='group flex w-[200rem] shrink-0 snap-start flex-col gap-[8rem] md:w-auto'
					>
						<div className='relative h-[108rem] w-full overflow-hidden rounded-[16rem] md:rounded-[20rem]'>
							<Image
								src={video.thumbnailUrl}
								alt={video.title}
								fill
								sizes='200px'
								className='object-cover transition-transform duration-500 group-hover:scale-105'
							/>
						</div>
						<span className='line-clamp-1 text-[12rem] text-white'>{video.title}</span>
					</Link>
				))}
			</div>
		</div>
	)
}
