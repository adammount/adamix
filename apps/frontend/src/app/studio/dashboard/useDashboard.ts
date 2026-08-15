import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { useAuth } from '@/hooks/useAuth'

import { channelService } from '@/services/channel.service'

export function useDashboard() {
	const { isLoggedIn } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.DASHBOARD,
		queryFn: () => channelService.getDashboard(),
		enabled: isLoggedIn
	})

	return {
		dashboard: data?.data,
		isLoading
	}
}
