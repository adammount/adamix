'use client'

import { Download, Play, Shuffle } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { GlassButton } from '@/ui/button/GlassButton'
import { PlaylistAside } from '@/ui/playlist-aside/PlaylistAside'

import { PAGE } from '@/config/public-page.config'

import type { ILikedVideo } from '@/types/video.types'

interface Props {
	count: number
	videos: ILikedVideo[]
}

export function LikedPlaylistAside({ count, videos }: Props) {
	const { push } = useRouter()

	const firstVideo = videos[0]

	const shuffle = () => {
		if (!videos.length) return
		const random = videos[Math.floor(Math.random() * videos.length)]
		push(`${PAGE.VIDEO(random.publicId)}?autoplay=1`)
	}

	return (
		<PlaylistAside
			title='Playlist'
			subtitle={`${count} Liked videos`}
		>
			<div className='flex flex-col gap-[16rem]'>
				<span className='divider' />
				<GlassButton
					href={firstVideo ? `${PAGE.VIDEO(firstVideo.publicId)}?autoplay=1` : '#'}
					variant='gradient'
					icon={<Play className='size-[12rem] md:size-[14rem]' />}
					className='h-[36rem] px-[17rem] text-[12rem] md:h-[46rem] md:px-[21rem] md:text-[14rem]'
				>
					Play all
				</GlassButton>
			</div>
			<div className='flex items-center justify-between gap-[12rem]'>
				<GlassButton
					onClick={shuffle}
					icon={<Shuffle className='size-[14rem] md:size-[16rem]' />}
					className='gap-[8rem] text-[12rem] md:gap-[16rem] md:text-[14rem]'
				>
					Shuffle
				</GlassButton>
				<GlassButton
					icon={<Download className='size-[13rem] md:size-[15rem]' />}
					className='gap-[8rem] text-[12rem] md:gap-[16rem] md:text-[14rem]'
				>
					Download
				</GlassButton>
			</div>
		</PlaylistAside>
	)
}
