'use client'

import Image from 'next/image'
import Link from 'next/link'

import { PageHeading } from '@/ui/PageHeading'
import { VerifiedIcon } from '@/ui/icons/VerifiedIcon'

import { STUDIO_PAGE } from '@/config/studio-page'

import { useSubscription } from '@/hooks/useSubscription'

import { getAvatarUrl, getPlaceholderImage } from '@/utils/get-placeholder-image'
import { transformCount } from '@/utils/transform-count'

import type { IChannelDetail } from '@/types/channel.types'

export function ChannelHeader({ channel }: { channel: IChannelDetail }) {
	const { isOwner, isSubscribed, isPending, onSubscribe } = useSubscription(channel.slug)

	return (
		<div className='flex flex-col'>
			<div className='relative z-0 -mx-[8rem] h-[160rem] overflow-hidden rounded-[24rem] md:mx-0 md:h-[192rem] md:rounded-[40rem]'>
				<Image
					src={channel.bannerUrl || getPlaceholderImage(`${channel.slug}-banner`, 1172, 192)}
					alt={channel.user?.name || channel.slug}
					fill
					sizes='1172px'
					className='object-cover'
					priority
				/>
			</div>

			<div className='relative z-10 -mt-[44rem] flex flex-col gap-[8rem] px-[8rem] md:-mt-[44rem] md:flex-row md:items-end md:justify-between md:px-[16rem]'>
				<div className='flex items-end gap-[8rem] md:gap-[16rem]'>
					<div className='size-[64rem] shrink-0 rounded-full border-4 border-white-25 bg-bg p-[4rem] backdrop-blur-[8rem] md:size-[128rem] md:border-[10rem] md:p-[10rem]'>
						<div className='relative size-full overflow-hidden rounded-full'>
							<Image
								src={getAvatarUrl(channel.avatarUrl, channel.slug, 128)}
								alt={channel.user?.name || channel.slug}
								fill
								sizes='128px'
								className='object-cover'
							/>
						</div>
					</div>
					<div className='flex flex-col gap-[4rem] pb-[8rem]'>
						<PageHeading className='flex items-center gap-[8rem] text-[24rem] leading-[24rem] text-white md:text-[36rem] md:leading-[40rem]'>
							{channel.user?.name}
							{channel.isVerified && <VerifiedIcon className='size-[16rem] md:size-[20rem]' />}
						</PageHeading>
						<p className='text-[12rem] leading-[16rem] text-white-60 md:text-[14rem] md:leading-[20rem]'>
							{transformCount(channel._count.subscribers)} subscribers
						</p>
					</div>
				</div>

				<div className='-mr-[8rem] flex items-end gap-[8rem] overflow-x-auto pb-[8rem] pr-[8rem] [scrollbar-width:none] md:mr-0 md:flex-wrap md:overflow-visible md:pb-[28rem] md:pr-0 [&::-webkit-scrollbar]:hidden'>
					{isOwner ? (
						<>
							<Link
								href={STUDIO_PAGE.DASHBOARD}
								className='glass-pill h-[36rem] shrink-0 rounded-full px-[17rem] text-[12rem] md:h-[44rem] md:rounded-[24rem] md:px-[21rem] md:text-[14rem]'
							>
								Dashboard
							</Link>
							<Link
								href={STUDIO_PAGE.SETTINGS}
								className='glass-pill h-[36rem] shrink-0 rounded-full px-[17rem] text-[12rem] md:h-[44rem] md:rounded-[24rem] md:px-[21rem] md:text-[14rem]'
							>
								Customize Channel
							</Link>
							<Link
								href={STUDIO_PAGE.HOME}
								className='glass-pill h-[36rem] shrink-0 rounded-full px-[17rem] text-[12rem] md:h-[44rem] md:rounded-[24rem] md:px-[21rem] md:text-[14rem]'
							>
								Manage Videos
							</Link>
						</>
					) : (
						<button
							onClick={onSubscribe}
							disabled={isPending}
							className='glass-pill h-[36rem] rounded-full px-[17rem] text-[12rem] font-semibold disabled-state md:h-[44rem] md:rounded-[24rem] md:px-[21rem] md:text-[14rem]'
						>
							{isPending ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
