import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/studio/user.service'

import { useAuth } from './useAuth'

export function useProfile() {
	const { isLoggedIn } = useAuth()

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		enabled: isLoggedIn,
		refetchInterval: 1800000 //30 min.
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
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		enabled: isLoggedIn,
		refetchInterval: 1800000,
		select: res => select(res.data)
	})

	return data
}
