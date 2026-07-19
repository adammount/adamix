import Link from 'next/link'

import { Avatar } from '@/ui/Avatar'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedIcon } from '@/ui/icons/VerifiedIcon'

import { STUDIO_PAGE } from '@/config/studio-page'

import { useProfileSelector } from '@/hooks/useProfile'

export function HeaderAvatar() {
	const channel = useProfileSelector(data => ({
		avatarUrl: data?.channel?.avatarUrl ?? null,
		isVerified: data?.channel?.isVerified ?? false
	}))

	if (!channel)
		return (
			<SkeletonLoader className='size-[22rem] mb-0 rounded-full md:size-[32rem]' />
		)

	return (
		<div className='relative shrink-0'>
			<Link
				href={STUDIO_PAGE.SETTINGS}
				className='block'
				aria-label='Open settings'
			>
				<Avatar
					src={channel.avatarUrl || 'https://picsum.photos/seed/avatar/64/64'}
					size={32}
					sizeClassName='size-[22rem] md:size-[32rem]'
				/>
			</Link>

			{channel.isVerified && (
				<VerifiedIcon className='absolute -right-[2rem] -top-[2rem] size-[10rem]' />
			)}
		</div>
	)
}
