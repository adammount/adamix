export interface IPaginated<T> {
	page: number
	limit: number
	totalCount: number
	totalPages: number
	videos: T[]
}

export function getPaginationSkip(page: number, limit: number) {
	return (page - 1) * limit
}

export function getTotalPages(totalCount: number, limit: number) {
	return limit > 0 ? Math.ceil(totalCount / limit) : 0
}

export function buildPagination<T>(
	videos: T[],
	page: number,
	limit: number,
	totalCount: number
): IPaginated<T> {
	return {
		videos,
		page,
		limit,
		totalCount,
		totalPages: getTotalPages(totalCount, limit)
	}
}
