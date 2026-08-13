import { axiosClassic } from '@/api/axios'

import type { ICategoryVideosResponse, ICategoryWithPreview } from '@/types/category.types'
import type { IPaginationParams } from '@/types/pagination.types'

class CategoryService {
	private _CATEGORIES = '/categories'

	getAll() {
		return axiosClassic.get<ICategoryWithPreview[]>(this._CATEGORIES)
	}

	getBySlug(slug: string, params?: IPaginationParams) {
		return axiosClassic.get<ICategoryVideosResponse>(`${this._CATEGORIES}/${slug}`, { params })
	}
}

export const categoryService = new CategoryService()
