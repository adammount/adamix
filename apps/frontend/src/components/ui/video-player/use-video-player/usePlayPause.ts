import { type RefObject, useEffect, useState } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

export function usePlayPause(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	bgRef: RefObject<HTMLCustomVideoElement | null>
) {
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		const player = playerRef.current
		if (!player) return

		const handlePlay = () => setIsPlaying(true)
		const handlePause = () => setIsPlaying(false)

		player.addEventListener('play', handlePlay)
		player.addEventListener('pause', handlePause)

		return () => {
			player.removeEventListener('play', handlePlay)
			player.removeEventListener('pause', handlePause)
		}
	}, [playerRef])

	const togglePlayPause = async () => {
		const player = playerRef.current
		if (!player) return

		if (player.paused) {
			try {
				await player.play()
				bgRef.current?.play().catch(() => {})
				setIsPlaying(true)
			} catch {
				setIsPlaying(false)
			}
			return
		}

		player.pause()
		bgRef.current?.pause()
		setIsPlaying(false)
	}

	return {
		isPlaying,
		togglePlayPause,
		setIsPlaying
	}
}
