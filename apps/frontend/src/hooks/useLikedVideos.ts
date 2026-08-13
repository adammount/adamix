import { useInfiniteQuery } from '@tanstack/react-query'

import { useAuth } from './useAuth'
import { userService } from '@/services/studio/user.service'

const LIMIT = 30

export function useLikedVideos() {
	const { isLoggedIn } = useAuth()

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['liked-videos'],
		queryFn: async ({ pageParam }) => {
			const res = await userService.getLikedVideos({
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

	return {
		count: data?.pages[0]?.count ?? 0,
		videos: data?.pages.flatMap(page => page.videos) ?? [],
		isLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage
	}
}
