import Link from 'next/link'

import { VideoThumbnail } from '@/ui/VideoThumbnail'

import { PAGE } from '@/config/public-page.config'

import { getPlaylistCover } from '@/utils/get-playlist-cover'

import type { IPlaylistPreview } from '@/types/playlist.types'

export function PlaylistMiniCard({ playlist }: { playlist: IPlaylistPreview }) {
	const cover = getPlaylistCover(playlist, 128)

	return (
		<Link
			href={PAGE.PLAYLISTS(playlist.id)}
			className='group transition-base flex items-center gap-[8rem] rounded-[16rem] p-[4rem] hover-desktop:bg-white-15'
		>
			<VideoThumbnail
				src={cover}
				alt={playlist.title}
				sizes='64px'
				rounded='rounded-[16rem]'
				className='size-[64rem] shrink-0'
			/>
			<div className='flex flex-col gap-[4rem]'>
				<p className='transition-fast line-clamp-1 text-[14rem] text-white-60 group-hover:text-white'>
					{playlist.title}
				</p>
				<p className='text-[9rem] text-white-60'>{playlist._count.videos} videos</p>
			</div>
		</Link>
	)
}
