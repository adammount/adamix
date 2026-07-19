'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { CommentItem } from './CommentItem'
import { commentService } from '@/services/comment.service'
import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicAddCommentsForm = dynamic(
	() => import('./AddCommentsForm').then(mod => mod.AddCommentsForm),
	{ ssr: false }
)

interface Props {
	video: ISingleVideoResponse
}

export function Comments({ video }: Props) {
	const { data, refetch } = useQuery({
		queryKey: ['comments', video.id],
		queryFn: () => commentService.byVideoPublicId(video.publicId),
		initialData: video.comments
	})

	return (
		<div className='flex flex-col gap-[16rem] pb-[12rem] md:pb-0'>
			<h2 className='font-heading text-[18rem] text-white/80'>Comments</h2>

			<DynamicAddCommentsForm
				videoId={video.id}
				refetch={refetch}
			/>

			<div className='flex flex-col gap-[16rem]'>
				{!!data &&
					data.map(comment => (
						<CommentItem
							key={comment.id}
							comment={comment}
							refetch={refetch}
						/>
					))}
			</div>
		</div>
	)
}
