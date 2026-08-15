import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { PAGE } from '@/config/public-page.config'
import { QUERY_KEYS } from '@/config/query-keys.config'

import { useAuth } from './useAuth'
import { useProfileSelector } from './useProfile'
import { channelService } from '@/services/channel.service'

export function useSubscription(slug: string) {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { isLoggedIn } = useAuth()

	const status = useProfileSelector(data => ({
		isOwner: data?.channel?.slug === slug,
		isSubscribed: data?.subscriptions.some(sub => sub.slug === slug) ?? false
	}))

	const { mutate, isPending } = useMutation({
		mutationKey: ['subscribe', slug],
		mutationFn: () => channelService.toggleSubscribe(slug),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROFILE })
		}
	})

	const onSubscribe = () => {
		if (isLoggedIn) mutate()
		else router.push(PAGE.AUTH)
	}

	return {
		isOwner: status?.isOwner ?? false,
		isSubscribed: status?.isSubscribed ?? false,
		isPending,
		onSubscribe
	}
}
