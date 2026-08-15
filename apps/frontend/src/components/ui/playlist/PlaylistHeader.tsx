import { Play, Shuffle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { GlassButton } from '@/ui/button/GlassButton'

import { PAGE } from '@/config/public-page.config'

import { getPlaceholderImage } from '@/utils/get-placeholder-image'
import { transformCount } from '@/utils/transform-count'

import type { IPlaylistDetail } from '@/types/playlist.types'

export function PlaylistHeader({ playlist }: { playlist: IPlaylistDetail }) {
	const { push } = useRouter()

	const videos = playlist.videos
	const firstVideo = videos[0]
	const cover =
		playlist.coverUrl || firstVideo?.thumbnailUrl || getPlaceholderImage(playlist.id, 512)

	const shuffle = () => {
		if (!videos.length) return
		const random = videos[Math.floor(Math.random() * videos.length)]
		push(`${PAGE.VIDEO(random.publicId)}?autoplay=1`)
	}

	return (
		<div className='flex flex-col gap-[12rem] rounded-[24rem] glass px-[13rem] py-[17rem] md:flex-row md:items-center md:gap-[24rem] md:rounded-[40rem] md:p-[17rem]'>
			<div className='relative aspect-square w-full shrink-0 overflow-hidden rounded-[16rem] md:size-[256rem] md:rounded-[24rem]'>
				<Image
					src={cover}
					alt={playlist.title}
					fill
					sizes='(max-width: 767px) 100vw, 256px'
					className='object-cover'
					priority
				/>
			</div>
			<div className='flex flex-col gap-[16rem]'>
				<div className='flex flex-col gap-[4rem]'>
					<h2 className='font-heading text-[30rem] font-semibold leading-[normal] text-white md:text-[36rem] md:font-medium md:leading-[40rem]'>
						{playlist.title}
					</h2>
					<p className='text-[14rem] text-white-60'>
						{videos.length} Videos • {transformCount(playlist.viewsCount)} views
					</p>
				</div>
				<div className='flex items-start gap-[12rem]'>
					<GlassButton
						href={firstVideo ? `${PAGE.VIDEO(firstVideo.publicId)}?autoplay=1` : '#'}
						variant='gradient'
						icon={<Play className='size-[12rem] md:size-[14rem]' />}
						className='h-[36rem] px-[17rem] text-[12rem] md:h-[46rem] md:px-[21rem] md:text-[14rem]'
					>
						Play all
					</GlassButton>
					<GlassButton
						onClick={shuffle}
						variant='solid'
						icon={<Shuffle className='size-[14rem] md:size-[16rem]' />}
						className='h-[36rem] px-[17rem] text-[12rem] md:h-[46rem] md:px-[21rem] md:text-[14rem]'
					>
						Shuffle
					</GlassButton>
				</div>
			</div>
		</div>
	)
}
