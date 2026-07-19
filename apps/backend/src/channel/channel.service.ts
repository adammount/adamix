import { PrismaService } from '@/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ChannelService {
	constructor(private readonly prisma: PrismaService) {}

	async bySlug(slug: string) {
		const channel = await this.prisma.channel.findUnique({
			where: { slug },

			include: {
				user: true,

				videos: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						channel: {
							include: {
								user: true,
								_count: { select: { subscribers: true } }
							}
						}
					}
				},
				subscribers: true,
				_count: { select: { subscribers: true, videos: true } }
			}
		})
		if (!channel) throw new NotFoundException('Channel not found')

		const playlists = await this.prisma.playlist.findMany({
			where: { userId: channel.userId },
			include: {
				_count: { select: { videos: true } },
				videos: {
					take: 1,
					orderBy: { viewsCount: 'desc' },
					select: { thumbnailUrl: true }
				}
			},
			orderBy: { createdAt: 'desc' }
		})

		return {
			...channel,
			playlists
		}
	}

	async getAll() {
		return this.prisma.channel.findMany()
	}

	async getDashboard(userId: string) {
		const channel = await this.prisma.channel.findUnique({
			where: { userId },
			include: {
				_count: { select: { subscribers: true } },
				videos: {
					orderBy: { createdAt: 'desc' },
					include: {
						_count: { select: { likes: true, comments: true } }
					}
				}
			}
		})

		if (!channel) throw new NotFoundException('Channel not found')

		const videoIds = channel.videos.map(video => video.id)

		const totalViews = channel.videos.reduce(
			(sum, video) => sum + video.viewsCount,
			0
		)
		const totalLikes = channel.videos.reduce(
			(sum, video) => sum + video._count.likes,
			0
		)
		const totalComments = channel.videos.reduce(
			(sum, video) => sum + video._count.comments,
			0
		)

		const recentComments = await this.prisma.videoComment.findMany({
			where: { videoId: { in: videoIds } },
			include: {
				user: {
					include: { channel: true }
				}
			},
			orderBy: { createdAt: 'desc' },
			take: 5
		})

		const since = new Date()
		since.setDate(since.getDate() - 28)

		const watchEvents = await this.prisma.watchHistory.findMany({
			where: {
				videoId: { in: videoIds },
				watchedAt: { gte: since }
			},
			select: { watchedAt: true }
		})

		const viewsByDay = new Map<string, number>()
		for (const event of watchEvents) {
			const key = event.watchedAt.toISOString().slice(0, 10)
			viewsByDay.set(key, (viewsByDay.get(key) ?? 0) + 1)
		}

		const chart: { date: string; views: number }[] = []
		for (let i = 27; i >= 0; i--) {
			const date = new Date(since)
			date.setDate(since.getDate() + (28 - i))
			const key = date.toISOString().slice(0, 10)
			chart.push({ date: key, views: viewsByDay.get(key) ?? 0 })
		}

		const latestVideo = channel.videos[0] ?? null

		return {
			totalSubscribers: channel._count.subscribers,
			totalViews,
			totalLikes,
			totalComments,
			latestVideo,
			videos: channel.videos.slice(0, 3),
			recentComments,
			chart
		}
	}

	async toggleSubscribe(slug: string, userId: string) {
		const channel = await this.prisma.channel.findUnique({
			where: { slug },
			select: { id: true }
		})
		if (!channel) throw new NotFoundException('Channel not found')

		const isSubscribed =
			(await this.prisma.user.count({
				where: {
					id: userId,
					subscriptions: {
						some: { id: channel.id }
					}
				}
			})) > 0

		if (isSubscribed) {
			await this.prisma.user.update({
				where: { id: userId },
				data: {
					subscriptions: {
						disconnect: { id: channel.id }
					}
				}
			})

			return { message: 'Unsubscribed successfully', isSubscribed: false }
		} else {
			await this.prisma.user.update({
				where: { id: userId },
				data: {
					subscriptions: {
						connect: { id: channel.id }
					}
				}
			})

			return { message: 'Subscribed successfully', isSubscribed: true }
		}
	}
}
