import { type RefObject, useEffect } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

interface Props {
	isLightingMode: boolean
	isPlaying: boolean
}

export function useAmbientSync(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	bgRef: RefObject<HTMLCustomVideoElement | null>,
	{ isLightingMode, isPlaying }: Props
) {
	useEffect(() => {
		const player = playerRef.current
		const bg = bgRef.current
		if (!isLightingMode || !player || !bg) return

		bg.currentTime = player.currentTime

		if (isPlaying) bg.play().catch(() => {})
		else bg.pause()
	}, [isLightingMode, isPlaying, playerRef, bgRef])

	useEffect(() => {
		const player = playerRef.current
		if (!isLightingMode || !player) return

		const sync = () => {
			const bg = bgRef.current
			if (!bg) return
			if (Math.abs(bg.currentTime - player.currentTime) > 0.5) {
				bg.currentTime = player.currentTime
			}
		}

		const interval = setInterval(sync, 2000)
		return () => clearInterval(interval)
	}, [isLightingMode, playerRef, bgRef])
}
