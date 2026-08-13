import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type SubmitHandler, type UseFormReturn } from 'react-hook-form'

import { STUDIO_PAGE } from '@/config/studio-page'

import { VideoForm } from './VideoForm'
import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	form: UseFormReturn<IVideoFormData, unknown, IVideoFormData>
	isReadyToPublish: boolean
}

export function CreateVideoForm({ form, isReadyToPublish }: Props) {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		async onSuccess() {
			form.reset()
			const { toast } = await import('react-hot-toast')
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.HOME)
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Video creating has error!')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='flex flex-col gap-[24rem]'
		>
			<VideoForm form={form} />
			<button
				type='submit'
				disabled={!isReadyToPublish || isPending}
				className='glass-action self-end px-[17rem] py-[8rem] text-[12rem] md:px-[24rem] md:py-[12rem] md:text-[14rem]'
			>
				{isPending ? 'Publishing...' : isReadyToPublish ? 'Publish' : 'Wait processing...'}
			</button>
		</form>
	)
}
