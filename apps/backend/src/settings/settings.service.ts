import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

import { UpdateSettingsDto } from './dto/update-settings.dto'

@Injectable()
export class SettingsService {
	constructor(private readonly prisma: PrismaService) {}

	async getByUserId(userId: string) {
		return this.prisma.userSettings.upsert({
			where: { userId },
			update: {},
			create: { userId }
		})
	}

	async update(userId: string, dto: UpdateSettingsDto) {
		return this.prisma.userSettings.upsert({
			where: { userId },
			update: dto,
			create: { userId, ...dto }
		})
	}
}
