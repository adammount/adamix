import { useMutation } from '@tanstack/react-query'

import { useProfile } from '@/hooks/useProfile'

import type { ISettingsData } from '@/app/studio/settings/settings.types'
import { userService } from '@/services/studio/user.service'

export function useAccountSettings() {
	const { profile, refetch } = useProfile()

	const { mutate } = useMutation({
		mutationKey: ['update-account'],
		mutationFn: (data: ISettingsData) => userService.updateProfile(data),
		async onSuccess() {
			refetch()
			const { toast } = await import('react-hot-toast')
			toast.success('Saved')
		},
		async onError() {
			const { toast } = await import('react-hot-toast')
			toast.error('Could not save')
		}
	})

	const save = (data: Partial<ISettingsData>) => {
		mutate({
			name: profile?.name ?? '',
			email: profile?.email ?? '',
			channel: profile?.channel
				? {
						avatarUrl: profile.channel.avatarUrl,
						bannerUrl: profile.channel.bannerUrl,
						description: profile.channel.description,
						slug: profile.channel.slug
					}
				: undefined,
			...data
		})
	}

	const saveAvatar = (avatarUrl: string) => {
		save({
			channel: {
				avatarUrl,
				bannerUrl: profile?.channel?.bannerUrl ?? '',
				description: profile?.channel?.description ?? '',
				slug: profile?.channel?.slug ?? ''
			}
		})
	}

	return { profile, save, saveAvatar }
}
