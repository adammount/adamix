import { useInfiniteQuery, useMutation } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/config/query-keys.config'

import { useAuth } from './useAuth'
import { watchHistoryService } from '@/services/watch-history.service'

const LIMIT = 30

export function useWatchHistory() {
	const { isLoggedIn } = useAuth()

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
		useInfiniteQuery({
			queryKey: QUERY_KEYS.WATCH_HISTORY,
			queryFn: async ({ pageParam }) => {
				const res = await watchHistoryService.getUserHistory({
					page: pageParam,
					limit: LIMIT
				})
				return res.data
			},
			initialPageParam: 1,
			getNextPageParam: lastPage =>
				lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
			enabled: isLoggedIn
		})

	const { mutate: clearHistory, isPending: isClearing } = useMutation({
		mutationKey: ['clear-history'],
		mutationFn: () => watchHistoryService.clearHistory(),
		onSuccess: () => refetch()
	})

	const history = data?.pages.flatMap(page => page.items) ?? []

	return {
		history,
		count: data?.pages[0]?.totalCount ?? 0,
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
		clearHistory,
		isClearing
	}
}
