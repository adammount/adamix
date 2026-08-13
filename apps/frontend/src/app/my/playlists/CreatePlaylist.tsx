'use client'

import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { Field } from '@/ui/field/Field'
import { Modal } from '@/ui/modal/Modal'

import { playlistService } from '@/services/playlist.service'
import type { IPlaylistData } from '@/types/playlist.types'

interface Props {
	refetch: () => void
	onClose: () => void
}

export function CreatePlaylist({ refetch, onClose }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IPlaylistData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		async onSuccess() {
			refetch()
			reset()
			onClose()
			const { toast } = await import('react-hot-toast')
			toast.success('Playlist successfully created!')
		},
		async onError(error: unknown) {
			const { toast } = await import('react-hot-toast')
			const axios = (await import('axios')).default
			const message = axios.isAxiosError(error)
				? (error.response?.data?.message ?? 'Failed to create playlist')
				: 'Failed to create playlist'
			toast.error(message)
		}
	})

	const onSubmit: SubmitHandler<IPlaylistData> = data => {
		mutate(data)
	}

	return (
		<Modal
			title='Create a playlist'
			onClose={onClose}
			className='w-[440rem] max-w-full'
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-[16rem]'
			>
				<Field
					label='Title'
					type='text'
					registration={register('title', { required: 'Title is required!' })}
					error={errors.title?.message}
					placeholder='Enter title'
				/>
				<Field
					label='Video public id (optional)'
					type='text'
					registration={register('videoPublicId', {
						validate: value =>
							!value || value.length === 10 || 'Video public id must be exactly 10 characters!'
					})}
					error={errors.videoPublicId?.message}
					placeholder='Enter video public id'
				/>
				<button
					type='submit'
					disabled={isPending}
					className='glass-action mt-[8rem] px-[17rem] py-[8rem] text-[12rem] md:px-[24rem] md:py-[12rem] md:text-[14rem]'
				>
					{isPending ? 'Creating...' : 'Create'}
				</button>
			</form>
		</Modal>
	)
}
