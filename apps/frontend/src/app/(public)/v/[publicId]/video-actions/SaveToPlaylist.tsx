import { useMutation } from '@tanstack/react-query'
import { Check, ListVideo } from 'lucide-react'

import { useOutside } from '@/hooks/useOutside'

import { useUserPlaylists } from '@/app/my/playlists/useUserPlaylists'
import { playlistService } from '@/services/playlist.service'
import type { ISingleVideoResponse } from '@/types/video.types'

interface Props {
	video: ISingleVideoResponse
}

export function SaveToPlaylist({ video }: Props) {
	const { data, refetch: refetchPlaylists } = useUserPlaylists()

	const { isShow, ref, setIsShow } = useOutside<HTMLDivElement>(false)

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video'],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
		async onSuccess() {
			const { toast } = await import('react-hot-toast')
			toast.success('Successfully changed!', {
				id: 'playlist'
			})
			setIsShow(false)
			refetchPlaylists()
		}
	})

	return (
		<div
			className='relative z-10'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				aria-haspopup='menu'
				aria-expanded={isShow}
				className='glass-pill h-[36rem] gap-[8rem] px-[17rem] text-[12rem] md:h-[44rem] md:px-[21rem] md:text-[14rem]'
			>
				<ListVideo
					className='size-[14rem] md:size-[16rem]'
					aria-hidden='true'
				/>
				Save
			</button>
			<ul
				data-open={isShow}
				className='popover glass-strong absolute right-0 top-[44rem] flex w-max max-w-[200rem] flex-col gap-[8rem] rounded-[20rem] p-[12rem] md:top-[52rem]'
			>
				{data?.data.map(playlist => (
					<li key={playlist.id}>
						<button
							onClick={() => {
								togglePlaylist(playlist.id)
							}}
							className='disabled-state flex w-full items-center gap-[6rem] rounded-[12rem] px-[8rem] py-[6rem] text-left text-[14rem] text-white-60 transition-fast not-disabled:hover-desktop:bg-white-15 not-disabled:hover-desktop:text-white'
							disabled={isPending}
						>
							{playlist.videos.some(v => v.id === video.id) && (
								<Check
									className='size-[14rem] text-brown-light'
									aria-hidden='true'
								/>
							)}
							{playlist.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
