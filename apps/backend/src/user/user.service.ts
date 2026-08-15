import { PrismaService } from '@/prisma.service'
import { getPaginationSkip, getTotalPages } from '@/utils/pagination.util'

import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { randomUUID } from 'crypto'
import { omit } from 'lodash'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async byId(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				likes: {
					include: {
						video: {
							include: {
								channel: {
									include: {
										user: true
									}
								}
							}
						}
					}
				},
				channel: true,
				subscriptions: {
					include: {
						user: true
					}
				}
			}
		})
		if (!user) throw new NotFoundException('User not found')

		return omit(user, ['password'])
	}

	async getProfile(id: string) {
		const user = await this.byId(id)

		const subscribedVideos = await this.prisma.video.findMany({
			where: {
				channel: {
					subscribers: {
						some: {
							id: id
						}
					}
				}
			},
			include: {
				channel: {
					include: {
						user: true,
						_count: { select: { subscribers: true } }
					}
				},
				likes: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return {
			...user,
			subscribedVideos
		}
	}

	async getLikedVideos(id: string, page = 1, limit = 30) {
		const skip = getPaginationSkip(page, limit)

		const [likes, totalCount] = await Promise.all([
			this.prisma.videoLike.findMany({
				where: { userId: id },
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
				orderBy: {
					createdAt: 'desc'
				},
				skip,
				take: limit
			}),
			this.prisma.videoLike.count({ where: { userId: id } })
		])

		return {
			count: totalCount,
			page,
			limit,
			totalCount,
			totalPages: getTotalPages(totalCount, limit),
			videos: likes.map(like => ({
				...like.video,
				likedAt: like.createdAt
			}))
		}
	}

	async updateProfile(
		id: string,
		{ channel, password, ...dto }: UpdateUserDto
	) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})
		if (!user) throw new NotFoundException('User not found')
		const isSameUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (isSameUser && String(id) !== String(isSameUser.id))
			throw new NotFoundException('Email busy')

		if (password) {
			const hashPassword = await hash(password)
			user.password = hashPassword
		}

		const isEmailChanged = dto.email && dto.email !== user.email

		const updated = await this.prisma.user.update({
			where: { id },
			data: {
				password: user.password,
				...dto,
				...(isEmailChanged && { verificationToken: randomUUID() }),
				...(channel && {
					channel: {
						upsert: {
							create: channel,
							update: channel
						}
					}
				})
			}
		})

		return omit(updated, ['password'])
	}

	async getCount() {
		return this.prisma.user.count()
	}

	async getAll(searchTerm?: string) {
		return this.prisma.user.findMany({
			where: searchTerm
				? {
						email: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				: {},
			select: {
				email: true,
				createdAt: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async delete(id: string) {
		return this.prisma.user.delete({
			where: { id }
		})
	}

	async toggleLike(videoId: string, userId: string) {
		const videoExists = await this.prisma.video.findUnique({
			where: { id: videoId }
		})

		if (!videoExists) {
			throw new Error('Видео не найдено')
		}

		const isLiked = await this.prisma.videoLike.findFirst({
			where: {
				userId: userId,
				videoId: videoId
			}
		})

		if (isLiked) {
			return this.prisma.videoLike.delete({
				where: {
					id: isLiked.id
				}
			})
		}

		return this.prisma.videoLike.create({
			data: {
				userId: userId,
				videoId: videoId
			}
		})
	}
}
