import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreatePlaylistDto } from './dto/create-playlist.dto'

@Injectable()
export class PlaylistService {
	constructor(private readonly prisma: PrismaService) {}

	async getPlaylistById(playlistId: string) {
		const playlist = await this.prisma.playlist.findUnique({
			where: { id: playlistId },
			include: {
				user: {
					include: {
						channel: true
					}
				},
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
				}
			}
		})

		if (!playlist) {
			throw new NotFoundException('Плейлист не найден')
		}

		const otherPlaylists = await this.prisma.playlist.findMany({
			where: {
				userId: playlist.userId,
				id: { not: playlistId }
			},
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

		const viewsCount = playlist.videos.reduce(
			(sum, video) => sum + video.viewsCount,
			0
		)

		return {
			...playlist,
			viewsCount,
			otherPlaylists
		}
	}

	async getUserPlaylists(userId: string) {
		const playlists = await this.prisma.playlist.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				videos: true
			}
		})
		return playlists
	}

	async toggleVideoInPlaylist(
		playlistId: string,
		videoId: string,
		userId: string
	) {
		const playlist = await this.prisma.playlist.findFirst({
			where: {
				id: playlistId,
				userId
			},
			include: {
				videos: true
			}
		})

		if (!playlist) {
			throw new NotFoundException('Плейлист не найден или недоступен')
		}

		const videoExists = await this.prisma.video.findUnique({
			where: { id: videoId }
		})

		if (!videoExists) {
			throw new NotFoundException('Видео не найдено')
		}

		const isVideoInPlaylist = playlist.videos.some(
			video => video.id === videoId
		)

		if (isVideoInPlaylist) {
			await this.prisma.playlist.update({
				where: { id: playlistId },
				data: {
					videos: {
						disconnect: { id: videoId }
					}
				}
			})
			return { message: 'Видео удалено из плейлиста' }
		} else {
			await this.prisma.playlist.update({
				where: { id: playlistId },
				data: {
					videos: {
						connect: { id: videoId }
					}
				}
			})
			return { message: 'Видео добавлено в плейлист' }
		}
	}

	async createPlaylist(userId: string, createPlaylistDto: CreatePlaylistDto) {
		const { title, videoPublicId } = createPlaylistDto

		let video = null

		if (videoPublicId) {
			video = await this.prisma.video.findUnique({
				where: { publicId: videoPublicId }
			})

			if (!video) {
				throw new NotFoundException('Видео не найдено')
			}
		}

		const playlist = await this.prisma.playlist.create({
			data: {
				title,
				userId,
				videos: video
					? {
							connect: { publicId: videoPublicId }
						}
					: undefined
			},
			include: {
				videos: true
			}
		})

		return playlist
	}
}
