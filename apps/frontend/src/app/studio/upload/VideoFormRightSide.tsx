import Image from 'next/image'
import type { UseFormWatch } from 'react-hook-form'

import type { IVideoFormData } from '@/types/studio-video.types'

interface Props {
	watch: UseFormWatch<IVideoFormData>
}

export function VideoFormRightSide({ watch }: Props) {
	const thumbnail = watch('thumbnailUrl')

	return (
		<div className='overflow-hidden rounded-[24rem] glass'>
			<div className='relative aspect-video w-full overflow-hidden'>
				{thumbnail ? (
					<Image
						alt='Uploaded thumbnail'
						src={thumbnail}
						fill
						sizes='249px'
						className='object-cover'
					/>
				) : (
					<div className='flex size-full items-center justify-center bg-black-60 text-[12rem] text-white-60'>
						Wait thumbnail...
					</div>
				)}
			</div>
			<div className='flex flex-col gap-[2rem] p-[12rem]'>
				<span className='text-[12rem] text-white-40'>File name:</span>
				<span className='line-clamp-1 text-[12rem] text-white'>
					{watch('videoFileName')}
				</span>
			</div>
		</div>
	)
}
