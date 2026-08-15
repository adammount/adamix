'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { type Toast, toast } from 'react-hot-toast'

import { PAGE } from '@/config/public-page.config'
import { QUERY_KEYS } from '@/config/query-keys.config'
import { STUDIO_PAGE } from '@/config/studio-page'

import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
}

export function StudioActions({ video }: Props) {
	const queryClient = useQueryClient()

	const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete a video'],
		mutationFn: () => studioVideoService.delete(video.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.STUDIO_VIDEO_LIST
			})
			toast.success('Successfully deleted!')
		}
	})

	const handleDelete = () => {
		toast((t: Toast) => (
			<div>
				<p>Are you sure you want to delete this video?</p>
				<div className='flex justify-end gap-4 mt-2'>
					<button
						onClick={() => {
							deleteVideo()
							toast.dismiss(t.id)
						}}
						className='text-red-600'
					>
						Delete
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='text-gray-400'
					>
						Cancel
					</button>
				</div>
			</div>
		))
	}

	return (
		<div className='flex shrink-0 items-center gap-[12rem]'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				className='glass-icon-btn text-white-60 hover-desktop:text-white'
				target='_blank'
				title='Open in a new tab'
			>
				<ExternalLink className='size-[16rem]' />
			</Link>
			<Link
				href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
				className='glass-icon-btn text-brown-light hover-desktop:bg-white-25'
				title='Edit a video'
			>
				<Edit className='size-[16rem]' />
			</Link>
			<button
				onClick={handleDelete}
				className='glass-icon-btn text-danger not-disabled:hover-desktop:bg-white-25 disabled-state'
				title='Delete a video'
				disabled={isDeletePending}
			>
				<Trash2 className='size-[16rem]' />
			</button>
		</div>
	)
}
