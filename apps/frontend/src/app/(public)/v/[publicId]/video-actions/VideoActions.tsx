'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import cn from 'clsx'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PAGE } from '@/config/public-page.config'
import { QUERY_KEYS } from '@/config/query-keys.config'

import { useAuth } from '@/hooks/useAuth'
import { useProfile, useProfileSelector } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { SaveToPlaylist } from './SaveToPlaylist'
import { userService } from '@/services/studio/user.service'
import type { IProfileResponse } from '@/types/user.types'
import type { ISingleVideoResponse } from '@/types/video.types'

type ProfileQueryData = AxiosResponse<IProfileResponse>

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { isLoggedIn } = useAuth()
	const { profile } = useProfile()

	const isLiked =
		useProfileSelector(data => data?.likes.some(like => like.videoId === video.id)) || false

	const wasLikedByViewer = profile ? video.likes.some(like => like.userId === profile.id) : false
	const likeCount = video.likes.length - (wasLikedByViewer ? 1 : 0) + (isLiked ? 1 : 0)

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userService.toggleLike(video.id),
		async onMutate() {
			await queryClient.cancelQueries({ queryKey: QUERY_KEYS.PROFILE })
			const previousProfile = queryClient.getQueryData<ProfileQueryData>(QUERY_KEYS.PROFILE)

			queryClient.setQueryData<ProfileQueryData>(QUERY_KEYS.PROFILE, old => {
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
				queryClient.setQueryData(QUERY_KEYS.PROFILE, context.previousProfile)
			}
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROFILE })
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.LIKED_VIDEOS,
				refetchType: 'inactive'
			})
		}
	})

	const handleLike = () => {
		if (isLoggedIn) mutate()
		else router.push(PAGE.AUTH)
	}

	return (
		<div className='flex flex-wrap items-start justify-end gap-[12rem]'>
			<SaveToPlaylist video={video} />
			<button
				className='glass-pill h-[36rem] gap-[8rem] px-[17rem] text-[12rem] md:h-[44rem] md:px-[21rem] md:text-[14rem]'
				onClick={handleLike}
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
