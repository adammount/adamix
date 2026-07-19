import { PrismaService } from '@/prisma.service'

import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		return this.prisma.category.findMany({
			orderBy: {
				name: 'asc'
			},
			include: {
				_count: {
					select: { videos: true }
				},
				videos: {
					where: { isPublic: true },
					orderBy: { viewsCount: 'desc' },
					take: 1,
					select: { thumbnailUrl: true }
				}
			}
		})
	}

	async getBySlug(slug: string, page = 1, limit = 30) {
		const category = await this.prisma.category.findUnique({
			where: { slug }
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		const skip = (page - 1) * limit

		const videos = await this.prisma.video.findMany({
			where: {
				isPublic: true,
				categories: {
					some: { slug }
				}
			},
			include: {
				channel: {
					include: {
						user: true,
						_count: { select: { subscribers: true } }
					}
				},
				tags: true
			},
			orderBy: { createdAt: 'desc' },
			skip,
			take: limit
		})

		const totalCount = await this.prisma.video.count({
			where: {
				isPublic: true,
				categories: {
					some: { slug }
				}
			}
		})

		return {
			category,
			videos,
			page,
			limit,
			totalCount,
			totalPages: Math.ceil(totalCount / limit)
		}
	}
}
