'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { Heart } from 'lucide-react'
import { startTransition, useState } from 'react'

import { useProfileSelector } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { SaveToPlaylist } from './SaveToPlaylist'
import { userService } from '@/services/studio/user.service'
import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
	const queryClient = useQueryClient()

	const isLiked =
		useProfileSelector(data =>
			data?.likes.some(like => like.videoId === video.id)
		) || false

	const [isLikedLocal, setIsLikedLocal] = useState(isLiked)

	const [optimisticLike, setOptimisticLike] = useState<number>(video.likes.length)

	const [prevIsLiked, setPrevIsLiked] = useState(isLiked)
	if (prevIsLiked !== isLiked) {
		setPrevIsLiked(isLiked)
		setIsLikedLocal(isLiked)
	}

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userService.toggleLike(video.id),
		onMutate() {
			startTransition(() => {
				const newIsLiked = !isLikedLocal
				setIsLikedLocal(newIsLiked)
				setOptimisticLike(prevLikeCount => {
					if (newIsLiked) return prevLikeCount + 1
					return prevLikeCount - 1
				})
			})
		},
		onError() {
			startTransition(() => {
				const revertedIsLiked = !isLikedLocal
				setIsLikedLocal(revertedIsLiked)
				setOptimisticLike(prevLikeCount => {
					if (revertedIsLiked) return prevLikeCount + 1
					return prevLikeCount - 1
				})
			})
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			queryClient.invalidateQueries({
				queryKey: ['liked-videos'],
				refetchType: 'inactive'
			})
		}
	})

	return (
		<div className='flex flex-wrap items-start justify-end gap-[12rem]'>
			<SaveToPlaylist video={video} />
			<button
				className='glass-pill h-[36rem] gap-[8rem] px-[17rem] text-[12rem] md:h-[44rem] md:px-[21rem] md:text-[14rem]'
				onClick={() => mutate()}
			>
				<Heart
					className={cn(
						'size-[14rem] md:size-[16rem]',
						isLikedLocal
							? 'fill-danger text-danger'
							: 'fill-transparent'
					)}
				/>
				{transformCount(optimisticLike)} Likes
			</button>
		</div>
	)
}
