'use client'

import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Avatar } from '@/ui/Avatar'
import { VerifiedIcon } from '@/ui/icons/VerifiedIcon'

import { PAGE } from '@/config/public-page.config'

import { commentService } from '@/services/comment.service'
import { transformDate } from '@/utils/transform-date'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicCommentActions = dynamic(
	() => import('./CommentActions').then(mod => mod.CommentActions),
	{ ssr: false }
)

interface Props {
	comment: ISingleVideoResponse['comments'][0]
	refetch: () => void
}

export function CommentItem({ comment, refetch }: Props) {
	const [isEditing, setIsEditing] = useState(false)
	const [text, setText] = useState(comment.text)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (isEditing) {
			const el = textareaRef.current
			el?.focus()
			el?.setSelectionRange(el.value.length, el.value.length)
		}
	}, [isEditing])

	const { mutate: updateComment, isPending } = useMutation({
		mutationKey: ['update comment', comment.id],
		mutationFn: () => commentService.update(comment.id, { text }),
		onSuccess: () => {
			setIsEditing(false)
			refetch()
		}
	})

	const cancelEdit = () => {
		setText(comment.text)
		setIsEditing(false)
	}

	const saveEdit = () => {
		if (isPending) return
		const trimmed = text.trim()
		if (!trimmed || trimmed === comment.text) {
			cancelEdit()
			return
		}
		updateComment()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			saveEdit()
		} else if (e.key === 'Escape') {
			e.preventDefault()
			cancelEdit()
		}
	}

	return (
		<div className='flex items-start gap-[12rem]'>
			{comment.user?.channel ? (
				<Link
					href={PAGE.CHANNEL(comment.user.channel.slug)}
					className='shrink-0'
				>
					<Avatar
						src={comment.user.channel.avatarUrl}
						name={comment.user.name}
						size={36}
					/>
				</Link>
			) : (
				<Avatar name={comment.user.name} size={36} />
			)}

			<div className='flex min-w-0 flex-1 flex-col gap-[6rem]'>
				<div className='flex items-center gap-[8rem]'>
					<span className='flex items-center gap-[4rem] text-[12rem] font-semibold text-white'>
						{comment.user.name}
						{comment.user.channel?.isVerified && (
							<VerifiedIcon className='size-[10rem]' />
						)}
					</span>
					<span className='text-[9rem] text-white-60'>
						{transformDate(comment.createdAt)}
					</span>
				</div>

				{isEditing ? (
					<div className='flex flex-col gap-[4rem]'>
						<textarea
							ref={textareaRef}
							value={text}
							onChange={e => setText(e.target.value)}
							onKeyDown={handleKeyDown}
							onBlur={saveEdit}
							rows={2}
							disabled={isPending}
							aria-label='Edit comment'
							className='glass-input disabled-state h-auto resize-none py-[10rem] text-[12rem] leading-[18rem]'
						/>
						<span className='text-[9rem] text-white-40'>
							{isPending
								? 'Saving...'
								: 'Enter to save · Esc to cancel'}
						</span>
					</div>
				) : (
					<p className='whitespace-pre-wrap break-words text-[12rem] leading-[18rem] text-white-60'>
						{comment.text}
					</p>
				)}
			</div>

			{!isEditing && (
				<DynamicCommentActions
					comment={comment}
					refetch={refetch}
					onEdit={() => setIsEditing(true)}
				/>
			)}
		</div>
	)
}
