import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/hooks/useAuth'

import { channelService } from '@/services/channel.service'

export function useDashboard() {
	const { isLoggedIn } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: ['dashboard'],
		queryFn: () => channelService.getDashboard(),
		enabled: isLoggedIn
	})

	return {
		dashboard: data?.data,
		isLoading
	}
}
