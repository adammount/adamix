import { type RefObject } from 'react'

interface FullScreenElement extends HTMLElement {
	mozRequestFullScreen?: () => Promise<void>
	webkitRequestFullscreen?: () => Promise<void>
	msRequestFullscreen?: () => Promise<void>
}

interface FullScreenDocument extends Document {
	mozCancelFullScreen?: () => Promise<void>
	webkitExitFullscreen?: () => Promise<void>
	msExitFullscreen?: () => Promise<void>
}

export function useFullScreen(containerRef: RefObject<HTMLDivElement | null>) {
	const toggleFullScreen = () => {
		const container = containerRef.current as FullScreenElement | null
		if (!container) return

		const doc = document as FullScreenDocument
		const isFullScreen = Boolean(doc.fullscreenElement)

		if (isFullScreen) {
			if (doc.exitFullscreen) doc.exitFullscreen()
			else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen()
			else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen()
			else if (doc.msExitFullscreen) doc.msExitFullscreen()
			return
		}

		if (container.requestFullscreen) container.requestFullscreen()
		else if (container.mozRequestFullScreen) container.mozRequestFullScreen()
		else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen()
		else if (container.msRequestFullscreen) container.msRequestFullscreen()
	}

	return {
		toggleFullScreen
	}
}
