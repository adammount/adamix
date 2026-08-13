import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/hooks/useAuth'

import { playlistService } from '@/services/playlist.service'

export function useUserPlaylists() {
	const { isLoggedIn } = useAuth()

	return useQuery({
		queryKey: ['playlists'],
		queryFn: () => playlistService.getUserPlaylists(),
		enabled: isLoggedIn
	})
}
