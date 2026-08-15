'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { PageHeading } from '@/ui/PageHeading'

import { QUERY_KEYS } from '@/config/query-keys.config'
import { STUDIO_PAGE } from '@/config/studio-page'

import { getErrorMessage } from '@/utils/get-error-message'

import { VideoForm } from '@/app/studio/upload/VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-video.types'

export function EditVideoForm() {
	const { id } = useParams()
	const router = useRouter()

	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: QUERY_KEYS.STUDIO_VIDEO(id as string),
		queryFn: () => studioVideoService.byId(id as string)
	})

	useEffect(() => {
		if (!isSuccess) return

		const initialVideo = data.data

		form.reset({
			title: initialVideo.title,
			description: initialVideo.description,
			maxResolution: initialVideo.maxResolution,
			thumbnailUrl: initialVideo.thumbnailUrl,
			tags: initialVideo.tags.map(tag => tag.name),
			videoFileName: initialVideo.videoFileName
		})
	}, [form, isSuccess, data])

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['edit a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
		async onSuccess() {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.STUDIO_VIDEO_LIST
			})
			const { toast } = await import('react-hot-toast')
			toast.success('Video successfully updated!')
			router.push(STUDIO_PAGE.HOME)
		},
		async onError(error: unknown) {
			const { toast } = await import('react-hot-toast')
			toast.error(getErrorMessage(error, 'Video updating has error!'))
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<section className='flex flex-col gap-[20rem] md:gap-[36rem]'>
			<PageHeading className='text-[30rem] md:text-[36rem]'>Edit video</PageHeading>

			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-[24rem]'
			>
				<VideoForm
					form={form}
					isPending={isLoading || isPending}
				/>
				<button
					type='submit'
					disabled={isPending}
					className='glass-action self-end px-[17rem] py-[8rem] text-[12rem] md:px-[24rem] md:py-[12rem] md:text-[14rem]'
				>
					{isPending ? 'Updating...' : 'Update'}
				</button>
			</form>
		</section>
	)
}
