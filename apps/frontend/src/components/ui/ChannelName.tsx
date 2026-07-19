import cn from 'clsx'

import { VerifiedIcon } from '@/ui/icons/VerifiedIcon'

import type { IChannel } from '@/types/channel.types'

interface Props {
	channel?: IChannel
	className?: string
	verifiedClassName?: string
}

export function ChannelName({ channel, className, verifiedClassName }: Props) {
	return (
		<span className='flex items-center gap-[4rem]'>
			<span className={cn('line-clamp-1', className)}>{channel?.user?.name}</span>
			{channel?.isVerified && (
				<VerifiedIcon className={cn('size-[10rem]', verifiedClassName)} />
			)}
		</span>
	)
}
