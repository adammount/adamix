import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useAuth } from '@/hooks/useAuth'

import { commentService } from '@/services/comment.service'
import type { ICommentData } from '@/types/comment.types'

interface Props {
	videoId: string
	refetch: () => void
}

export function AddCommentsForm({ refetch, videoId }: Props) {
	const { isLoggedIn } = useAuth()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ICommentData>({
		mode: 'onChange'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.create(data),
		onSuccess: () => {
			refetch()
			reset()
		}
	})

	const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
		mutate({
			text,
			videoId
		})
	}

	if (!isLoggedIn) return null

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex items-center gap-[12rem] md:gap-[16rem]'
		>
			<input
				{...register('text', { required: true })}
				placeholder='Add a comment...'
				className='glass-input h-[36rem] flex-1 px-[16rem] text-[12rem] md:h-[44rem] md:px-[20rem] md:text-[14rem]'
				aria-invalid={!!errors.text}
			/>
			<button
				type='submit'
				disabled={isPending}
				className='glass-action shrink-0 px-[16rem] py-[8rem] text-[12rem] md:px-[24rem] md:py-[12rem] md:text-[14rem]'
			>
				{isPending ? 'Posting...' : 'Comment'}
			</button>
		</form>
	)
}
