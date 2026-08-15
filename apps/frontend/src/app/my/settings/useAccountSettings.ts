import { useMutation } from '@tanstack/react-query'

import { useProfile } from '@/hooks/useProfile'

import { getErrorMessage } from '@/utils/get-error-message'

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
		async onError(e: unknown) {
			const { toast } = await import('react-hot-toast')
			toast.error(getErrorMessage(e, 'Could not save'))
		}
	})

	const buildChannel = (overrides?: Partial<ISettingsData['channel']>) => {
		if (!profile?.channel) return undefined

		const channel = {
			slug: profile.channel.slug ?? '',
			avatarUrl: profile.channel.avatarUrl ?? '',
			bannerUrl: profile.channel.bannerUrl ?? '',
			description: profile.channel.description ?? '',
			...overrides
		}

		return channel.slug ? channel : undefined
	}

	const save = (data: Partial<ISettingsData>) => {
		mutate({
			name: profile?.name ?? '',
			email: profile?.email ?? '',
			channel: buildChannel(),
			...data
		})
	}

	const saveAvatar = (avatarUrl: string) => {
		save({ channel: buildChannel({ avatarUrl }) })
	}

	return { profile, save, saveAvatar }
}
