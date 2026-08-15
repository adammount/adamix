import { type RefObject } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

interface FullScreenElement extends HTMLElement {
	mozRequestFullScreen?: () => Promise<void>
	webkitRequestFullscreen?: () => Promise<void>
	msRequestFullscreen?: () => Promise<void>
}

interface FullScreenVideoElement extends HTMLVideoElement {
	webkitEnterFullscreen?: () => void
	webkitSupportsFullscreen?: boolean
}

interface FullScreenDocument extends Document {
	mozCancelFullScreen?: () => Promise<void>
	webkitExitFullscreen?: () => Promise<void>
	msExitFullscreen?: () => Promise<void>
	webkitFullscreenElement?: Element | null
}

export function useFullScreen(
	containerRef: RefObject<HTMLDivElement | null>,
	playerRef: RefObject<HTMLCustomVideoElement | null>
) {
	const toggleFullScreen = () => {
		const container = containerRef.current as FullScreenElement | null
		if (!container) return

		const doc = document as FullScreenDocument
		const isFullScreen = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement)

		if (isFullScreen) {
			if (doc.exitFullscreen) doc.exitFullscreen()
			else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen()
			else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen()
			else if (doc.msExitFullscreen) doc.msExitFullscreen()
			return
		}

		if (container.requestFullscreen) {
			container.requestFullscreen().catch(() => enterVideoFullScreen(playerRef))
			return
		}
		if (container.webkitRequestFullscreen) {
			container.webkitRequestFullscreen()
			return
		}
		if (container.mozRequestFullScreen) {
			container.mozRequestFullScreen()
			return
		}
		if (container.msRequestFullscreen) {
			container.msRequestFullscreen()
			return
		}

		enterVideoFullScreen(playerRef)
	}

	return {
		toggleFullScreen
	}
}

function enterVideoFullScreen(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const video = playerRef.current as FullScreenVideoElement | null
	if (video?.webkitEnterFullscreen) video.webkitEnterFullscreen()
}
