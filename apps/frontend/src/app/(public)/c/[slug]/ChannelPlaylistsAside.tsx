import cn from 'clsx'
import Image from 'next/image'

import { PlaylistAside } from '@/ui/playlist-aside/PlaylistAside'

import { getPlaylistCover } from '@/utils/get-playlist-cover'

import type { IPlaylistPreview } from '@/types/playlist.types'

interface Props {
	playlists: IPlaylistPreview[]
	activeId: string
	onSelect: (id: string) => void
}

export function ChannelPlaylistsAside({ playlists, activeId, onSelect }: Props) {
	return (
		<PlaylistAside
			title='Other Playlists by this Author'
			subtitle={`${playlists.length} playlists`}
		>
			<span className='divider' />
			<div className='flex flex-col gap-[12rem]'>
				{playlists.map(playlist => {
					const cover = getPlaylistCover(playlist, 128)

					return (
						<button
							key={playlist.id}
							onClick={() => onSelect(playlist.id)}
							className={cn(
								'flex items-center gap-[8rem] rounded-[16rem] p-[4rem] text-left transition-base',
								playlist.id === activeId ? 'bg-white-15' : 'hover-desktop:bg-white-15'
							)}
						>
							<div className='relative size-[64rem] shrink-0 overflow-hidden rounded-[16rem]'>
								<Image
									src={cover}
									alt={playlist.title}
									fill
									sizes='64px'
									className='object-cover'
								/>
							</div>
							<div className='flex flex-col gap-[4rem]'>
								<p className='line-clamp-1 text-[14rem] text-white'>{playlist.title}</p>
								<p className='text-[9rem] text-white-60'>{playlist._count.videos} videos</p>
							</div>
						</button>
					)
				})}
			</div>
		</PlaylistAside>
	)
}
