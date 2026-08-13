import { type Dispatch, type RefObject, type SetStateAction, useEffect, useRef } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

interface Props {
	isEnabled: boolean
	setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export function useAutoPlay(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	bgRef: RefObject<HTMLCustomVideoElement | null>,
	{ isEnabled, setIsPlaying }: Props
) {
	const hasStarted = useRef(false)

	useEffect(() => {
		const player = playerRef.current
		if (!isEnabled || !player || hasStarted.current) return

		const start = () => {
			if (hasStarted.current) return
			hasStarted.current = true

			player
				.play()
				.then(() => {
					bgRef.current?.play().catch(() => {})
					setIsPlaying(true)
				})
				.catch(() => {
					player.muted = true
					player
						.play()
						.then(() => {
							bgRef.current?.play().catch(() => {})
							setIsPlaying(true)
						})
						.catch(() => {})
				})
		}

		if (player.readyState >= 2) {
			start()
			return
		}

		player.addEventListener('loadeddata', start)
		return () => player.removeEventListener('loadeddata', start)
	}, [isEnabled, playerRef, bgRef, setIsPlaying])
}
