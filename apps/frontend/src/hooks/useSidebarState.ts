import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'sidebar-showed'

let listeners: (() => void)[] = []

function subscribe(listener: () => void) {
	listeners = [...listeners, listener]
	return () => {
		listeners = listeners.filter(item => item !== listener)
	}
}

function getSnapshot() {
	return localStorage.getItem(STORAGE_KEY) !== 'false'
}

function getServerSnapshot() {
	return true
}

export function useSidebarState() {
	const isShowedSidebar = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

	const toggleSidebar = useCallback(() => {
		localStorage.setItem(STORAGE_KEY, String(!getSnapshot()))
		listeners.forEach(listener => listener())
	}, [])

	return { isShowedSidebar, toggleSidebar }
}
