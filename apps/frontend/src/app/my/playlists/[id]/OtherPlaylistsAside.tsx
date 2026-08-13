import { PlaylistAside } from '@/ui/playlist-aside/PlaylistAside'
import { PlaylistMiniCard } from '@/ui/playlist/PlaylistMiniCard'

import type { IPlaylistPreview } from '@/types/playlist.types'

export function OtherPlaylistsAside({ playlists }: { playlists: IPlaylistPreview[] }) {
	return (
		<PlaylistAside
			title='Other Playlists by this Author'
			subtitle={`${playlists.length} playlists`}
		>
			<span className='divider' />
			<div className='flex flex-col gap-[12rem]'>
				{playlists.map(playlist => (
					<PlaylistMiniCard
						key={playlist.id}
						playlist={playlist}
					/>
				))}
			</div>
		</PlaylistAside>
	)
}
