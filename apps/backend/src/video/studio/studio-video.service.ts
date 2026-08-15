import { PrismaService } from '@/prisma.service'
import { buildPagination, getPaginationSkip } from '@/utils/pagination.util'
import { generateUniqueSlug, slugifyEmail } from '@/utils/slug.util'
import { nanoid } from 'nanoid'

import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@/generated/prisma'
import { CreateVideoDto, UpdateVideoDto } from '../dto/video.dto'

@Injectable()
export class StudioVideoService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(channelId: string, searchTerm?: string, page = 1, limit = 6) {
		const skip = getPaginationSkip(page, limit)
		const whereCondition = this.buildWhereCondition(channelId, searchTerm)

		const videos = await this.getVideos(whereCondition, skip, limit)

		const totalCount = await this.prisma.video.count({
			where: whereCondition
		})

		return buildPagination(videos, page, limit, totalCount)
	}

	async byId(channelId: string, id: string) {
		const video = await this.getVideoById(id)
		if (!video) throw new NotFoundException('Video not found')
		this.ensureOwnership(video.channelId, channelId)
		return video
	}

	async create(channelId: string, dto: CreateVideoDto, userId?: string) {
		const targetChannelId = channelId || (await this.ensureChannel(userId))

		const video = await this.createVideo(targetChannelId, dto)
		return video.id
	}

	private async ensureChannel(userId?: string) {
		if (!userId) {
			throw new BadRequestException('You need a channel to publish videos')
		}

		const existing = await this.prisma.channel.findUnique({
			where: { userId },
			select: { id: true }
		})
		if (existing) return existing.id

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { email: true }
		})
		if (!user) throw new NotFoundException('User not found')

		const slug = await generateUniqueSlug(
			slugifyEmail(user.email),
			async candidate =>
				Boolean(
					await this.prisma.channel.findUnique({
						where: { slug: candidate },
						select: { id: true }
					})
				)
		)

		const channel = await this.prisma.channel.create({
			data: { userId, slug },
			select: { id: true }
		})

		return channel.id
	}

	async update(channelId: string, id: string, dto: UpdateVideoDto) {
		await this.ensureVideoOwnedByChannel(id, channelId)
		const video = await this.updateVideo(id, dto)
		if (!video) throw new NotFoundException('Video not found')
		return video
	}

	async delete(channelId: string, id: string) {
		await this.ensureVideoOwnedByChannel(id, channelId)
		const video = await this.deleteVideo(id)
		if (!video) throw new NotFoundException('Video not found')
		return video
	}

	private async ensureVideoOwnedByChannel(id: string, channelId: string) {
		const video = await this.prisma.video.findUnique({
			where: { id },
			select: { channelId: true }
		})
		if (!video) throw new NotFoundException('Video not found')
		this.ensureOwnership(video.channelId, channelId)
	}

	private ensureOwnership(videoChannelId: string, channelId: string) {
		if (videoChannelId !== channelId) {
			throw new ForbiddenException('You do not own this video')
		}
	}

	private buildWhereCondition(
		channelId: string,
		searchTerm?: string
	): Prisma.VideoWhereInput {
		return {
			channelId,
			...(searchTerm && {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			})
		}
	}

	private async getVideos(
		whereCondition: Prisma.VideoWhereInput,
		skip: number,
		take: number
	) {
		return this.prisma.video.findMany({
			where: whereCondition,
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				channel: {
					include: {
						user: true
					}
				},
				tags: true,
				comments: true,
				likes: true
			},
			skip,
			take
		})
	}

	async getVideoById(id: string) {
		return this.prisma.video.findUnique({
			where: { id },
			include: {
				channel: true,
				tags: true,
				comments: true,
				likes: true
			}
		})
	}

	private async createVideo(channelId: string, dto: CreateVideoDto) {
		const { tags, ...videoData } = dto

		return this.prisma.video.create({
			data: {
				...videoData,
				publicId: nanoid(10),
				channel: {
					connect: { id: channelId }
				},
				isPublic: true,
				tags: tags?.length
					? {
							connectOrCreate: tags.map(tag => ({
								where: { name: tag },
								create: { name: tag }
							}))
						}
					: undefined
			}
		})
	}

	private async updateVideo(id: string, dto: UpdateVideoDto) {
		const { tags, ...videoData } = dto

		return this.prisma.video.update({
			where: { id },
			data: {
				...videoData,
				tags: tags?.length
					? {
							set: [],
							connectOrCreate: tags.map(tag => ({
								where: { name: tag },
								create: { name: tag }
							}))
						}
					: {
							set: []
						}
			}
		})
	}

	deleteVideo(id: string) {
		return this.prisma.video.delete({
			where: { id }
		})
	}
}
