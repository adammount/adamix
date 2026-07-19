'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { VerifiedIcon } from '@/ui/icons/VerifiedIcon'

import { PAGE } from '@/config/public-page.config'

import { useAuth } from '@/hooks/useAuth'
import { useProfileSelector } from '@/hooks/useProfile'

import { channelService } from '@/services/channel.service'
import { processHtmlContent } from '@/utils/process-html-content'
import { transformCount } from '@/utils/transform-count'
import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoChannel({ video }: { video: ISingleVideoResponse }) {
	const channel = video.channel
	const queryClient = useQueryClient()
	const router = useRouter()
	const { isLoggedIn } = useAuth()
	const [isExpanded, setIsExpanded] = useState(false)

	const status = useProfileSelector(data => ({
		isOwner: data?.channel?.slug === channel.slug,
		isSubscribed:
			data?.subscriptions.some(sub => sub.slug === channel.slug) ?? false
	}))
	const isOwner = status?.isOwner ?? false
	const isSubscribed = status?.isSubscribed ?? false

	const { mutate, isPending } = useMutation({
		mutationKey: ['subscribe', channel.slug],
		mutationFn: () => channelService.toggleSubscribe(channel.slug),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	const onSubscribe = () => {
		if (isLoggedIn) mutate()
		else router.push(PAGE.AUTH)
	}

	const { initialContent, isShouldShowToggle } = processHtmlContent(
		video.description,
		3
	)

	return (
		<div className='flex flex-col gap-[12rem] rounded-[24rem] border border-white-15 bg-white-15 px-[13rem] py-[17rem] backdrop-blur-[16rem] md:rounded-[40rem] md:p-[25rem]'>
			<div className='flex items-start justify-between'>
				<Link
					href={PAGE.CHANNEL(channel.slug)}
					className='flex items-center gap-[12rem]'
				>
					<div className='size-[48rem] shrink-0 rounded-full border border-white-15 bg-white-15 p-[3rem]'>
						<div className='relative size-full overflow-hidden rounded-full'>
							<Image
								src={channel.avatarUrl || `https://picsum.photos/seed/${channel.slug}/96/96`}
								alt={channel.user?.name || channel.slug}
								fill
								sizes='48px'
								className='object-cover'
							/>
						</div>
					</div>
					<div className='flex flex-col'>
						<span className='flex items-center gap-[6rem] font-heading text-[18rem] text-white'>
							{channel.user?.name}
							{channel.isVerified && <VerifiedIcon className='size-[14rem]' />}
						</span>
						<span className='text-[10rem] text-white-60'>
							{transformCount(channel.subscribers?.length ?? 0)} subscribers
						</span>
					</div>
				</Link>

				{!isOwner && (
					<button
						onClick={onSubscribe}
						disabled={isPending}
						className='glass-pill h-[36rem] px-[16rem] text-[12rem] font-semibold disabled-state md:h-[44rem] md:px-[21rem] md:text-[14rem]'
					>
						{isPending
							? 'Subscribing...'
							: isSubscribed
								? 'Subscribed'
								: 'Subscribe'}
					</button>
				)}
			</div>

			<div className='flex max-w-[672rem] flex-col items-start gap-[10rem] md:gap-[11rem]'>
				<article className='text-[12rem] leading-[18rem] text-white-60 md:text-[14rem] md:leading-[22rem] [&_a]:text-[#00aaff]'>
					{parse(isExpanded ? video.description : initialContent)}
				</article>
				{isShouldShowToggle && (
					<button
						onClick={() => setIsExpanded(prev => !prev)}
						className='p-[4rem] text-[12rem] font-semibold uppercase text-brown-light'
					>
						{isExpanded ? 'Hide' : 'Show more'}
					</button>
				)}
			</div>
		</div>
	)
}
