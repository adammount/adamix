import { Controller, Get, Param, Query } from '@nestjs/common'

import { PaginationQueryDto } from '@/dto/pagination.dto'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@Get(':slug')
	async getBySlug(
		@Param('slug') slug: string,
		@Query() paginationQuery: PaginationQueryDto
	) {
		const { page, limit } = paginationQuery
		return this.categoryService.getBySlug(slug, page, limit)
	}
}
