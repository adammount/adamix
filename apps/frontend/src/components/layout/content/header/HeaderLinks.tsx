import { Upload, Video } from 'lucide-react'
import Link from 'next/link'

import { STUDIO_PAGE } from '@/config/studio-page'

export function HeaderLinks() {
	return (
		<div className='flex items-center justify-center gap-[8rem]'>
			<Link
				href={STUDIO_PAGE.UPLOAD_VIDEO}
				className='flex size-[26rem] items-center justify-center text-white opacity-80 transition-fast hover-desktop:opacity-100 md:size-[20rem]'
				aria-label='Upload video'
			>
				<Upload
					className='size-[16rem]'
					aria-hidden='true'
				/>
			</Link>
			<Link
				href={STUDIO_PAGE.HOME}
				className='flex size-[26rem] items-center justify-center text-white opacity-80 transition-fast hover-desktop:opacity-100 md:size-[20rem]'
				aria-label='Studio page'
			>
				<Video
					className='size-[16rem]'
					aria-hidden='true'
				/>
			</Link>
		</div>
	)
}
