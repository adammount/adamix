import { type Dispatch, type RefObject, type SetStateAction, useEffect } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

interface Props {
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	onEnded?: () => void
}

export function useVideoEnded(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	{ setIsPlaying, onEnded }: Props
) {
	useEffect(() => {
		const player = playerRef.current
		if (!player) return

		const handleEnded = () => {
			setIsPlaying(false)
			onEnded?.()
		}

		player.addEventListener('ended', handleEnded)
		return () => player.removeEventListener('ended', handleEnded)
	}, [playerRef, setIsPlaying, onEnded])
}
