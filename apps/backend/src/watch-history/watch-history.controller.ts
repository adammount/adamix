import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { PaginationQueryDto } from '@/dto/pagination.dto'
import { WatchHistoryService } from './watch-history.service'

@Controller('watch-history')
export class WatchHistoryController {
	constructor(private readonly watchHistoryService: WatchHistoryService) {}

	@Get()
	@Auth()
	async getUserHistory(
		@CurrentUser('id') userId: string,
		@Query() paginationQuery: PaginationQueryDto
	) {
		const { page, limit } = paginationQuery
		return this.watchHistoryService.getByUserId(userId, page, limit)
	}

	@Post()
	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async addToHistory(
		@CurrentUser('id') userId: string,
		@Body('videoId') videoId: string
	) {
		return this.watchHistoryService.addToHistory(userId, videoId)
	}

	@Delete()
	@Auth()
	@HttpCode(200)
	async clearHistory(@CurrentUser('id') userId: string) {
		return this.watchHistoryService.clearHistory(userId)
	}
}
