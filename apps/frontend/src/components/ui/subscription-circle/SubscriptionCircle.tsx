import Image from 'next/image'
import Link from 'next/link'

import { VerifiedIcon } from '@/ui/icons/VerifiedIcon'

import { PAGE } from '@/config/public-page.config'

import type { IChannel } from '@/types/channel.types'

export function SubscriptionCircle({ channel }: { channel: IChannel }) {
	return (
		<Link
			href={PAGE.CHANNEL(channel.slug)}
			className='group flex w-[52rem] shrink-0 flex-col items-center gap-[4rem] md:w-[72rem]'
		>
			<div className='relative w-full'>
				<div className='transition-base flex size-[52rem] items-center justify-center rounded-full border border-brown-light bg-white-15 p-[3rem] group-hover:bg-white-25 md:size-[72rem]'>
					<Image
						src={channel.avatarUrl || `https://picsum.photos/seed/${channel.slug}/144/144`}
						alt={channel.user?.name || channel.slug}
						width={144}
						height={144}
						className='size-full rounded-full object-cover'
					/>
				</div>
				{channel.isVerified && (
					<span className='absolute right-0 top-0 flex size-[18rem] items-center justify-center rounded-full border-[1.5rem] border-white-60 bg-dark-brown'>
						<VerifiedIcon className='size-[10rem]' />
					</span>
				)}
			</div>
			<span className='transition-fast line-clamp-1 max-w-full text-[12rem] text-white/80 group-hover:text-white'>
				{channel.user?.name || channel.slug}
			</span>
		</Link>
	)
}
