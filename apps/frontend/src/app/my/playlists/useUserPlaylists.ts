import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { useAuth } from '@/hooks/useAuth'

import { playlistService } from '@/services/playlist.service'

export function useUserPlaylists() {
	const { isLoggedIn } = useAuth()

	return useQuery({
		queryKey: QUERY_KEYS.PLAYLISTS,
		queryFn: () => playlistService.getUserPlaylists(),
		enabled: isLoggedIn
	})
}
