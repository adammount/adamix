'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { PAGE } from '@/config/public-page.config'

import { useAuth } from '@/hooks/useAuth'
import { useProfileSelector } from '@/hooks/useProfile'

import { stripHtmlWithBreak } from '@/utils/strip-html'
import { transformCount } from '@/utils/transform-count'

import { channelService } from '@/services/channel.service'
import type { IChannelDetail } from '@/types/channel.types'

export function ChannelAbout({ channel }: { channel: IChannelDetail }) {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { isLoggedIn } = useAuth()
	const [expanded, setExpanded] = useState(false)

	const status = useProfileSelector(data => ({
		isOwner: data?.channel?.slug === channel.slug,
		isSubscribed: data?.subscriptions.some(sub => sub.slug === channel.slug) ?? false
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

	const description = channel.description
		? stripHtmlWithBreak(channel.description)
		: 'No description yet.'
	const isLong = description.length > 280

	return (
		<div className='grid grid-cols-1 gap-[16rem] md:grid-cols-3 md:gap-[32rem]'>
			<div className='glass flex flex-col gap-[12rem] rounded-[24rem] px-[13rem] py-[17rem] backdrop-blur-[16rem] md:col-span-2 md:rounded-[40rem] md:p-[25rem]'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-[12rem]'>
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
							<span className='font-heading text-[18rem] text-white'>{channel.user?.name}</span>
							<span className='text-[10rem] text-white-60'>
								{transformCount(channel._count.subscribers)} subscribers
							</span>
						</div>
					</div>

					{!isOwner && (
						<button
							onClick={onSubscribe}
							disabled={isPending}
							className='glass-pill h-[36rem] shrink-0 px-[16rem] text-[12rem] font-semibold disabled-state md:h-[44rem] md:px-[21rem] md:text-[14rem]'
						>
							{isPending ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
						</button>
					)}
				</div>

				<div className='flex max-w-[672rem] flex-col items-start gap-[11rem]'>
					<p
						className={`whitespace-pre-line text-[14rem] leading-[22rem] text-white-60 ${expanded ? '' : 'line-clamp-3'}`}
					>
						{description}
					</p>
					{isLong && (
						<button
							onClick={() => setExpanded(prev => !prev)}
							className='p-[4rem] text-[12rem] font-semibold uppercase text-brown-light'
						>
							{expanded ? 'Show less' : 'Show more'}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
