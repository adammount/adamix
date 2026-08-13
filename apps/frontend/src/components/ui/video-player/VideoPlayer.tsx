'use client'

import { Lightbulb, LightbulbOff, Maximize, Pause, Play, RectangleHorizontal } from 'lucide-react'

import { PlayerProgressBar } from './progress-bar/PlayerProgressBar'
import { SelectQuality } from './quality/SelectQuality'
import { useVideoPlayer } from './use-video-player/useVideoPlayer'
import { EnumVideoPlayerQuality } from './video-player.types'
import { getTime } from './video-player.util'
import { VolumeControl } from './volume/VolumeControl'

interface Props {
	fileName: string
	toggleTheaterMode: () => void
	maxResolution: EnumVideoPlayerQuality
	onEnded?: () => void
	shouldAutoPlay?: boolean
}

export function VideoPlayer({
	fileName,
	toggleTheaterMode,
	maxResolution,
	onEnded,
	shouldAutoPlay
}: Props) {
	const { fn, playerRef, bgRef, containerRef, state } = useVideoPlayer({
		fileName,
		toggleTheaterMode,
		maxResolution,
		onEnded,
		shouldAutoPlay
	})

	const playPauseLabel = state.isPlaying ? 'Pause' : 'Play'
	const lightingLabel = state.isLightingMode ? 'Turn off ambient light' : 'Turn on ambient light'

	return (
		<div
			ref={containerRef}
			className='relative overflow-hidden bg-white-15/5 backdrop-blur-[16rem] md:rounded-[40rem] md:border md:border-white-15'
		>
			{state.isLightingMode && (
				<video
					ref={bgRef}
					aria-hidden='true'
					className='absolute left-0 top-0 size-full scale-[1.02] object-cover blur-3xl brightness-90 contrast-125 saturate-150 mix-blend-lighten filter'
					src={`/uploads/videos/${EnumVideoPlayerQuality['360p']}/${fileName}`}
					muted
				>
					<track kind='captions' />
				</video>
			)}

			<video
				ref={playerRef}
				className='relative z-[1] aspect-video w-full'
				controls={false}
				src={`/uploads/videos/${maxResolution}/${fileName}`}
				preload='metadata'
			>
				<track kind='captions' />
			</video>

			<div className='absolute bottom-0 left-0 right-0 z-[2] flex flex-col gap-[16rem] p-[12rem] md:p-[24rem]'>
				<PlayerProgressBar
					currentTime={state.currentTime}
					duration={state.videoTime}
					progress={state.progress}
					onSeek={fn.onSeek}
				/>

				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-[8rem] md:gap-[12rem]'>
						<button
							onClick={fn.togglePlayPause}
							title={playPauseLabel}
							aria-label={playPauseLabel}
							className='transition-fast hover-desktop:text-brown-light'
						>
							{state.isPlaying ? (
								<Pause
									className='size-[20rem]'
									aria-hidden='true'
								/>
							) : (
								<Play
									className='size-[20rem]'
									aria-hidden='true'
								/>
							)}
						</button>
						<VolumeControl
							changeVolume={fn.changeVolume}
							toggleMute={fn.toggleMute}
							value={state.volume}
							isMuted={state.isMuted}
						/>
						<span className='text-[12rem] text-white-60'>{getTime(state.videoTime)}</span>
					</div>

					<div className='flex items-center gap-[12rem]'>
						<SelectQuality
							currentValue={state.quality}
							onChange={fn.changeQuality}
							maxResolution={maxResolution}
						/>
						<button
							className='transition-fast hover-desktop:text-brown-light'
							onClick={fn.toggleLightingMode}
							title={lightingLabel}
							aria-label={lightingLabel}
						>
							{state.isLightingMode ? (
								<Lightbulb
									className='size-[20rem]'
									aria-hidden='true'
								/>
							) : (
								<LightbulbOff
									className='size-[20rem]'
									aria-hidden='true'
								/>
							)}
						</button>
						<button
							className='hidden transition-fast hover-desktop:text-brown-light md:block'
							onClick={toggleTheaterMode}
							title='Theater mode'
							aria-label='Toggle theater mode'
						>
							<RectangleHorizontal
								className='size-[20rem]'
								aria-hidden='true'
							/>
						</button>
						<button
							onClick={fn.toggleFullScreen}
							title='Fullscreen'
							aria-label='Toggle fullscreen'
							className='transition-fast hover-desktop:text-brown-light'
						>
							<Maximize
								className='size-[20rem]'
								aria-hidden='true'
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
