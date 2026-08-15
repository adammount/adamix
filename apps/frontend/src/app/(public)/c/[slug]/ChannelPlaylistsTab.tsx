'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { EmptyState } from '@/ui/EmptyState'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { PlaylistHeader } from '@/ui/playlist/PlaylistHeader'
import { PlaylistTrackRow } from '@/ui/playlist/PlaylistTrackRow'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { ChannelPlaylistsAside } from './ChannelPlaylistsAside'
import { playlistService } from '@/services/playlist.service'
import type { IPlaylistPreview } from '@/types/playlist.types'

export function ChannelPlaylistsTab({ playlists }: { playlists: IPlaylistPreview[] }) {
	const [activeId, setActiveId] = useState(playlists[0]?.id ?? '')

	const { data, isPending, isError } = useQuery({
		queryKey: QUERY_KEYS.PLAYLIST(activeId),
		queryFn: () => playlistService.getPlaylistById(activeId),
		enabled: !!activeId
	})

	const playlist = data?.data

	if (!playlists.length) {
		return <EmptyState title='No playlists on this channel yet' />
	}

	return (
		<div className='flex flex-col items-start gap-[24rem] md:flex-row md:gap-[32rem]'>
			<div className='flex w-full min-w-0 flex-1 flex-col gap-[24rem]'>
				{activeId && isPending ? (
					<SkeletonLoader
						count={1}
						className='h-[290rem] w-full rounded-[40rem]'
					/>
				) : !playlist ? (
					<EmptyState title={isError ? 'Failed to load playlist' : 'Select a playlist'} />
				) : (
					<>
						<PlaylistHeader playlist={playlist} />
						<div className='flex flex-col gap-[12rem]'>
							{playlist.videos.map((video, index) => (
								<PlaylistTrackRow
									key={video.id}
									video={video}
									index={index + 1}
								/>
							))}
						</div>
					</>
				)}
			</div>

			<ChannelPlaylistsAside
				playlists={playlists}
				activeId={activeId}
				onSelect={setActiveId}
			/>
		</div>
	)
}
