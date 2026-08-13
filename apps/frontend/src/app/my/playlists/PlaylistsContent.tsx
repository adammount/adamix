'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { EmptyState } from '@/ui/EmptyState'
import { PageHeading } from '@/ui/PageHeading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { GlassButton } from '@/ui/button/GlassButton'
import { PlaylistAside } from '@/ui/playlist-aside/PlaylistAside'

import { useIsClient } from '@/hooks/useIsClient'

import { CreatePlaylist } from './CreatePlaylist'
import { PlaylistRow } from './PlaylistRow'
import { useUserPlaylists } from './useUserPlaylists'

export function PlaylistsContent() {
	const isClient = useIsClient()
	const [isShow, setIsShow] = useState(false)
	const { data, isLoading, refetch } = useUserPlaylists()

	const playlists = data?.data ?? []

	return (
		<section className='flex flex-col gap-[20rem] md:flex-row md:items-start md:justify-between md:gap-[24rem]'>
			<PageHeading className='text-[30rem] md:hidden'>Playlists</PageHeading>

			<div className='md:hidden'>
				<PlaylistAside
					title='Your playlists'
					subtitle={`${playlists.length} playlists`}
				>
					<span className='divider' />
					<GlassButton
						onClick={() => setIsShow(true)}
						variant='gradient'
						icon={<Plus className='size-[14rem] md:size-[16rem]' />}
						className='h-[36rem] px-[17rem] text-[12rem] md:h-[46rem] md:px-[21rem] md:text-[14rem]'
					>
						Create a playlist
					</GlassButton>
				</PlaylistAside>
			</div>

			<div className='flex min-w-0 flex-1 flex-col gap-[36rem]'>
				<PageHeading className='hidden md:block'>Playlists</PageHeading>
				<div className='flex flex-col gap-[20rem]'>
					{!isClient || isLoading ? (
						<SkeletonLoader
							count={4}
							className='aspect-[278/174] w-full rounded-[20rem] md:aspect-auto md:h-[174rem] md:w-[278rem] md:rounded-[28rem]'
						/>
					) : playlists.length ? (
						playlists.map(playlist => (
							<PlaylistRow
								key={playlist.id}
								playlist={playlist}
							/>
						))
					) : (
						<EmptyState
							title='No playlists yet'
							description='Create a playlist to organize your videos'
						/>
					)}
				</div>
			</div>

			<div className='hidden md:sticky md:top-[16rem] md:block'>
				<PlaylistAside
					title='Your playlists'
					subtitle={`${playlists.length} playlists`}
				>
					<span className='divider' />
					<GlassButton
						onClick={() => setIsShow(true)}
						variant='gradient'
						icon={<Plus className='size-[16rem]' />}
					>
						Create a playlist
					</GlassButton>
				</PlaylistAside>
			</div>

			{isShow && (
				<CreatePlaylist
					refetch={refetch}
					onClose={() => setIsShow(false)}
				/>
			)}
		</section>
	)
}
