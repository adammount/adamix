import { useMutation } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'

import { commentService } from '@/services/comment.service'
import type { IComment } from '@/types/comment.types'

interface Props {
	comment: IComment
	refetch: () => void
	onEdit: () => void
}

const actionClass =
	'disabled-state flex shrink-0 items-center gap-[6rem] self-start rounded-[12rem] px-[10rem] py-[6rem] text-[9rem] font-semibold uppercase tracking-[0.45rem] text-white-60 transition-fast'

export function CommentActions({ comment, refetch, onEdit }: Props) {
	const { isLoggedIn, user } = useAuth()

	const { mutate: deleteComment, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete comment'],
		mutationFn: () => commentService.delete(comment.id),
		onSuccess: () => {
			refetch()
		}
	})

	if (!isLoggedIn) return null
	if (user?.id !== comment.user.id) return null

	return (
		<div className='flex shrink-0 items-center gap-[4rem] self-start'>
			<button
				className={`${actionClass} not-disabled:hover-desktop:bg-white-15 not-disabled:hover-desktop:text-white`}
				onClick={onEdit}
			>
				<Pencil
					className='size-[12rem]'
					aria-hidden='true'
				/>
				Edit
			</button>
			<button
				className={`${actionClass} not-disabled:hover-desktop:bg-white-15 not-disabled:hover-desktop:text-danger`}
				disabled={isDeletePending}
				onClick={() => deleteComment()}
			>
				<Trash2
					className='size-[12rem]'
					aria-hidden='true'
				/>
				{isDeletePending ? 'Deleting...' : 'Delete'}
			</button>
		</div>
	)
}
