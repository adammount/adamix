import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuth } from './useAuth'
import { settingsService } from '@/services/settings.service'
import type { IUserSettings, IUserSettingsUpdate } from '@/types/settings.types'

const QUERY_KEY = ['user-settings']

export function useUserSettings() {
	const { isLoggedIn } = useAuth()
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEY,
		queryFn: () => settingsService.getSettings(),
		enabled: isLoggedIn
	})

	const { mutate } = useMutation({
		mutationKey: ['update-user-settings'],
		mutationFn: (patch: IUserSettingsUpdate) => settingsService.updateSettings(patch),
		onMutate: patch => {
			queryClient.setQueryData<{ data: IUserSettings }>(QUERY_KEY, prev =>
				prev ? { ...prev, data: { ...prev.data, ...patch } } : prev
			)
		}
	})

	return {
		settings: data?.data,
		isLoading,
		update: mutate
	}
}
