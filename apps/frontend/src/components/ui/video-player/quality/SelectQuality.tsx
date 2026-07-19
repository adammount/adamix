'use client'

import cn from 'clsx'

import { useOutside } from '@/hooks/useOutside'

import { EnumVideoPlayerQuality } from '../video-player.types'

import { VIDEO_QUALITIES } from './qualities.data'

interface Props {
	currentValue: EnumVideoPlayerQuality
	onChange: (quality: EnumVideoPlayerQuality) => void
	maxResolution: EnumVideoPlayerQuality
}

export function SelectQuality({ currentValue, onChange, maxResolution }: Props) {
	const { isShow, ref, setIsShow } = useOutside<HTMLDivElement>(false)

	const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution))

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				aria-label={`Quality: ${currentValue}`}
				aria-haspopup='listbox'
				aria-expanded={isShow}
				className='text-[14rem] transition-fast hover-desktop:text-brown-light'
			>
				{currentValue}
			</button>

			<ul
				data-open={isShow}
				className='popover glass-strong absolute bottom-[32rem] right-0 z-10 flex flex-col gap-[8rem] rounded-[16rem] p-[12rem] [transform-origin:bottom]'
			>
				{availableQualities.map(quality => (
					<li key={quality}>
						<button
							onClick={() => {
								onChange(quality)
								setIsShow(false)
							}}
							className={cn(
								'w-full rounded-[10rem] px-[10rem] py-[4rem] text-left text-[14rem] transition-fast',
								{
									'text-white-40 not-disabled:hover-desktop:bg-white-15 not-disabled:hover-desktop:text-white':
										quality !== currentValue,
									'text-brown-light': quality === currentValue
								}
							)}
							disabled={quality === currentValue}
						>
							{quality}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
