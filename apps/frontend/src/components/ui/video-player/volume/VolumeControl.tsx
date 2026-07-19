import { Volume1, Volume2, VolumeX } from 'lucide-react'

import styles from './VolumeControl.module.scss'

interface Props {
	value: number
	isMuted: boolean
	changeVolume: (value: number) => void
	toggleMute: () => void
}

export function VolumeControl({ changeVolume, isMuted, toggleMute, value }: Props) {
	return (
		<div className='flex items-center gap-[8rem]'>
			<button
				onClick={toggleMute}
				aria-label={isMuted ? 'Unmute' : 'Mute'}
				className='transition-fast hover-desktop:text-brown-light'
			>
				{isMuted ? (
					<VolumeX
						className='size-[20rem]'
						aria-hidden='true'
					/>
				) : value < 0.4 ? (
					<Volume1
						className='size-[20rem]'
						aria-hidden='true'
					/>
				) : (
					<Volume2
						className='size-[20rem]'
						aria-hidden='true'
					/>
				)}
			</button>
			<input
				type='range'
				min='0'
				max='1'
				step='0.05'
				value={value}
				onChange={e => changeVolume(parseFloat(e.target.value))}
				aria-label='Volume'
				className={styles.slider}
				style={{
					background: `linear-gradient(to right, var(--color-brown-light) ${value * 100}%, var(--color-white-15) ${value * 100}%)`
				}}
			/>
		</div>
	)
}
