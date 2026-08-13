'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import cn from 'clsx'
import { Heart } from 'lucide-react'

import { useProfile, useProfileSelector } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { SaveToPlaylist } from './SaveToPlaylist'
import { userService } from '@/services/studio/user.service'
import type { IProfileResponse } from '@/types/user.types'
import type { ISingleVideoResponse } from '@/types/video.types'

type ProfileQueryData = AxiosResponse<IProfileResponse>

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
	const queryClient = useQueryClient()
	const { profile } = useProfile()

	const isLiked =
		useProfileSelector(data => data?.likes.some(like => like.videoId === video.id)) || false

	const wasLikedByViewer = profile ? video.likes.some(like => like.userId === profile.id) : false
	const likeCount = video.likes.length - (wasLikedByViewer ? 1 : 0) + (isLiked ? 1 : 0)

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userService.toggleLike(video.id),
		async onMutate() {
			await queryClient.cancelQueries({ queryKey: ['profile'] })
			const previousProfile = queryClient.getQueryData<ProfileQueryData>(['profile'])

			queryClient.setQueryData<ProfileQueryData>(['profile'], old => {
				if (!old?.data) return old
				return {
					...old,
					data: {
						...old.data,
						likes: isLiked
							? old.data.likes.filter(like => like.videoId !== video.id)
							: [
									...old.data.likes,
									{
										id: video.id,
										videoId: video.id,
										userId: old.data.id,
										video
									} as IProfileResponse['likes'][number]
								]
					}
				}
			})

			return { previousProfile }
		},
		onError(_err, _variables, context) {
			if (context?.previousProfile) {
				queryClient.setQueryData(['profile'], context.previousProfile)
			}
		},
		onSettled() {
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
				title={isLiked ? 'Remove like' : 'Like'}
			>
				<Heart
					className={cn(
						'size-[14rem] md:size-[16rem]',
						isLiked ? 'fill-danger text-danger' : 'fill-transparent'
					)}
				/>
				{transformCount(likeCount)} Likes
			</button>
		</div>
	)
}
