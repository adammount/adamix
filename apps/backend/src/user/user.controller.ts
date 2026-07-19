import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'

import { PaginationQueryDto } from '@/dto/pagination.dto'
import { User } from '@/generated/prisma'
import { CurrentUser } from './decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getProfile(id)
	}

	@Get('liked-videos')
	@Auth()
	async getLikedVideos(
		@CurrentUser('id') id: string,
		@Query() paginationQuery: PaginationQueryDto
	) {
		const { page, limit } = paginationQuery
		return this.userService.getLikedVideos(id, page, limit)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(
		@CurrentUser('id') id: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.updateProfile(id, dto)
	}

	@Put('profile/likes')
	@HttpCode(200)
	@Auth()
	async toggleLike(
		@Body('videoId') videoId: string,
		@CurrentUser() user: User
	) {
		return this.userService.toggleLike(videoId, user.id)
	}
}
