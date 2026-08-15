import cn from 'clsx'
import { type ChangeEvent, useState } from 'react'

import { COLORS } from '@/constants/colors.constants'

import { getTime } from '../video-player.util'

interface Props {
	currentTime: number
	duration: number
	progress: number
	buffered: number
	onSeek: (time: number) => void
}

export function PlayerProgressBar({ currentTime, progress, duration, buffered, onSeek }: Props) {
	const [isDragging, setIsDragging] = useState(false)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		onSeek(value)
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	return (
		<div className='relative flex w-full items-center rounded-full bg-white-15'>
			<div
				className='absolute left-0 top-0 h-[4rem] rounded-full bg-white-40'
				style={{ width: `${buffered}%` }}
			/>

			<div
				className='absolute left-0 top-0 h-[4rem] rounded-full'
				style={{
					width: `${progress}%`,
					backgroundColor: COLORS.primary
				}}
			/>

			<div
				className={cn(
					'absolute -top-7 left-0 text-base text-white transition-opacity duration-700',
					isDragging ? 'opacity-100' : 'opacity-0'
				)}
				style={{
					left: `calc(${progress}% - 20px)`
				}}
			>
				{getTime(currentTime)}
			</div>

			<input
				type='range'
				min={0}
				max={duration || 1}
				value={currentTime}
				onChange={handleChange}
				onMouseDown={() => setIsDragging(true)}
				onMouseUp={handleMouseUp}
				onTouchEnd={handleMouseUp}
				className='pointer-events-auto h-[4rem] w-full cursor-pointer appearance-none opacity-0'
			/>
		</div>
	)
}
