import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/user/decorators/user.decorator'
import { UpdateSettingsDto } from './dto/update-settings.dto'
import { SettingsService } from './settings.service'

@Controller('settings')
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

	@Get()
	@Auth()
	getSettings(@CurrentUser('id') userId: string) {
		return this.settingsService.getByUserId(userId)
	}

	@Put()
	@HttpCode(200)
	@UsePipes(new ValidationPipe({ whitelist: true }))
	@Auth()
	updateSettings(
		@CurrentUser('id') userId: string,
		@Body() dto: UpdateSettingsDto
	) {
		return this.settingsService.update(userId, dto)
	}
}
