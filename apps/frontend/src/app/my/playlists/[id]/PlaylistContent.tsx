'use client'

import { useQuery } from '@tanstack/react-query'

import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { PlaylistHeader } from '@/ui/playlist/PlaylistHeader'
import { PlaylistTrackRow } from '@/ui/playlist/PlaylistTrackRow'

import { useIsClient } from '@/hooks/useIsClient'

import { OtherPlaylistsAside } from './OtherPlaylistsAside'
import { playlistService } from '@/services/playlist.service'

export function PlaylistContent({ id }: { id: string }) {
	const isClient = useIsClient()
	const { data, isLoading } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistById(id),
		enabled: !!id
	})

	const playlist = data?.data

	return (
		<section className='flex flex-col gap-[20rem] md:flex-row md:items-start md:gap-[36rem]'>
			<PageHeading className='text-[30rem] md:hidden'>Playlist</PageHeading>

			{playlist && !!playlist.otherPlaylists.length && (
				<div className='md:hidden'>
					<OtherPlaylistsAside playlists={playlist.otherPlaylists} />
				</div>
			)}

			<div className='flex min-w-0 flex-1 flex-col gap-[36rem]'>
				<PageHeading className='hidden md:block'>Playlist</PageHeading>

				{!isClient || isLoading ? (
					<SkeletonLoader
						count={1}
						className='h-[290rem] w-full rounded-[40rem]'
					/>
				) : playlist ? (
					<div className='flex flex-col gap-[24rem]'>
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
					</div>
				) : (
					<p className='text-[16rem] text-white-60'>Playlist not found</p>
				)}
			</div>

			{playlist && !!playlist.otherPlaylists.length && (
				<div className='hidden md:sticky md:top-[16rem] md:block'>
					<OtherPlaylistsAside playlists={playlist.otherPlaylists} />
				</div>
			)}
		</section>
	)
}
