import Link from 'next/link'

import { VideoThumbnail } from '@/ui/VideoThumbnail'

import { PAGE } from '@/config/public-page.config'

import { getPlaylistCover } from '@/utils/get-playlist-cover'

import type { IPlaylist } from '@/types/playlist.types'

export function PlaylistRow({ playlist }: { playlist: IPlaylist }) {
	const cover = getPlaylistCover(playlist)

	return (
		<Link
			href={PAGE.PLAYLISTS(playlist.id)}
			className='group flex flex-col gap-[12rem] md:flex-row md:items-center md:gap-[16rem]'
		>
			<div className='glass aspect-[278/174] w-full shrink-0 overflow-hidden rounded-[20rem] p-[8rem] md:aspect-auto md:h-[174rem] md:w-[278rem] md:rounded-[28rem]'>
				<VideoThumbnail
					src={cover}
					alt={playlist.title}
					sizes='(max-width: 767px) 100vw, 278px'
					rounded='rounded-[20rem]'
					className='h-full w-full md:h-[158rem]'
				/>
			</div>
			<div className='flex flex-col gap-[8rem]'>
				<h3 className='line-clamp-1 font-heading text-[18rem] font-semibold text-white md:text-[30rem]'>
					{playlist.title}
				</h3>
				<span className='text-[14rem] text-white-60'>{playlist.videos.length} videos</span>
			</div>
		</Link>
	)
}
