import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { useAuth } from './useAuth'
import { userService } from '@/services/studio/user.service'

const PROFILE_REFETCH_INTERVAL = 30 * 60 * 1000

export function useProfile() {
	const { isLoggedIn } = useAuth()

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: QUERY_KEYS.PROFILE,
		queryFn: () => userService.getProfile(),
		enabled: isLoggedIn,
		refetchInterval: PROFILE_REFETCH_INTERVAL
	})

	return {
		profile: data?.data,
		isLoading,
		isSuccess,
		refetch
	}
}

export function useProfileSelector<T>(
	select: (data: Awaited<ReturnType<typeof userService.getProfile>>['data']) => T
) {
	const { isLoggedIn } = useAuth()

	const { data } = useQuery({
		queryKey: QUERY_KEYS.PROFILE,
		queryFn: () => userService.getProfile(),
		enabled: isLoggedIn,
		refetchInterval: PROFILE_REFETCH_INTERVAL,
		select: res => select(res.data)
	})

	return data
}
