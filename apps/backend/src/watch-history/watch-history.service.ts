import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class WatchHistoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getByUserId(userId: string, page = 1, limit = 30) {
		const skip = (page - 1) * limit

		const [items, totalCount] = await Promise.all([
			this.prisma.watchHistory.findMany({
				where: { userId },
				orderBy: {
					watchedAt: 'desc'
				},
				include: {
					video: {
						include: {
							channel: {
								include: {
									user: true,
									_count: { select: { subscribers: true } }
								}
							}
						}
					}
				},
				skip,
				take: limit
			}),
			this.prisma.watchHistory.count({ where: { userId } })
		])

		return {
			items,
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit)
		}
	}

	async addToHistory(userId: string, videoId: string) {
		return this.prisma.watchHistory.upsert({
			where: {
				userId_videoId: {
					userId,
					videoId
				}
			},
			update: {
				watchedAt: new Date()
			},
			create: {
				userId,
				videoId,
				watchedAt: new Date()
			}
		})
	}

	async clearHistory(userId: string) {
		return this.prisma.watchHistory.deleteMany({
			where: { userId }
		})
	}
}
