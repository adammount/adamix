import { type RefObject, useEffect, useState } from 'react'

import { type HTMLCustomVideoElement } from '../video-player.types'
import { getVideoInfo } from '../video-player.util'

export function useVideoProgress(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [buffered, setBuffered] = useState(0)

	useEffect(() => {
		const player = playerRef?.current
		if (!player) return

		const handleLoadedMetadata = () => {
			const { currentTime, progress, originalTime } = getVideoInfo(player)
			setVideoTime(originalTime)
			setCurrentTime(currentTime)
			setProgress(progress)
		}

		player.addEventListener('loadedmetadata', handleLoadedMetadata)

		if (player.readyState >= 1) {
			handleLoadedMetadata()
		}

		return () => {
			player.removeEventListener('loadedmetadata', handleLoadedMetadata)
		}
	}, [playerRef])

	useEffect(() => {
		const player = playerRef?.current
		if (!player) return

		const updateProgress = () => {
			const { currentTime, progress } = getVideoInfo(player)
			setCurrentTime(currentTime)
			setProgress(progress)
		}

		player.addEventListener('timeupdate', updateProgress)
		player.addEventListener('seeking', updateProgress)
		player.addEventListener('seeked', updateProgress)

		return () => {
			player.removeEventListener('timeupdate', updateProgress)
			player.removeEventListener('seeking', updateProgress)
			player.removeEventListener('seeked', updateProgress)
		}
	}, [playerRef])

	useEffect(() => {
		const player = playerRef?.current
		if (!player) return

		const updateBuffered = () => {
			if (!player.buffered.length || !player.duration) return

			const end = player.buffered.end(player.buffered.length - 1)
			setBuffered((end / player.duration) * 100)
		}

		player.addEventListener('progress', updateBuffered)
		player.addEventListener('timeupdate', updateBuffered)

		return () => {
			player.removeEventListener('progress', updateBuffered)
			player.removeEventListener('timeupdate', updateBuffered)
		}
	}, [playerRef])

	return {
		currentTime,
		setCurrentTime,
		progress,
		videoTime,
		buffered
	}
}
