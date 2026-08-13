import { type Dispatch, type RefObject, type SetStateAction, useState } from 'react'

import { type EnumVideoPlayerQuality, type HTMLCustomVideoElement } from '../video-player.types'

interface Props {
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	fileName: string
	currentTime: number
	maxResolution: EnumVideoPlayerQuality
}

export function useVideoQuality(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	{ currentTime, fileName, setIsPlaying, maxResolution }: Props
) {
	const [quality, setQuality] = useState(maxResolution)

	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef.current) return
		setQuality(quality)

		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`
		playerRef.current.currentTime = currentTime
		playerRef.current.play()
		setIsPlaying(true)
	}

	return {
		quality,
		changeQuality
	}
}
