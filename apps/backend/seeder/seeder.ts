import 'dotenv/config'

import { faker } from '@faker-js/faker'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma'
import { hash } from 'argon2'
import { nanoid } from 'nanoid'
import { CATEGORIES } from './categories.data'
import { CHANNELS } from './channels.data'
import { VIDEOS } from './videos/videos.data'

function resolveCategorySlugs(title: string, tags: string[] = []) {
	const haystack = [title, ...tags].join(' ').toLowerCase()
	const matched = CATEGORIES.filter(category =>
		category.keywords.some(keyword => haystack.includes(keyword))
	).map(category => category.slug)

	if (matched.length) return matched

	const fallback =
		CATEGORIES[faker.number.int({ min: 0, max: CATEGORIES.length - 1 })]
	return [fallback.slug]
}

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL as string
})
const prisma = new PrismaClient({ adapter })

async function main() {
	if (
		process.env.NODE_ENV === 'production' &&
		process.env.SEED_CONFIRM !== 'yes'
	) {
		throw new Error(
			'Сидер удаляет все данные. Для запуска в production задайте SEED_CONFIRM=yes'
		)
	}

	console.log('Начало заполнения базы данных...')

	console.log('Очистка существующих данных...')
	await prisma.watchHistory.deleteMany()
	await prisma.videoComment.deleteMany()
	await prisma.videoLike.deleteMany()
	await prisma.playlist.deleteMany()
	await prisma.video.deleteMany()
	await prisma.videoTag.deleteMany()
	await prisma.category.deleteMany()
	await prisma.channel.deleteMany()
	await prisma.user.deleteMany()
	console.log('Данные очищены.')

	// Массивы для хранения созданных пользователей и каналов
	const users = []
	const channelSlugToId: { [key: string]: string } = {}
	const channelSlugToUserId: { [key: string]: string } = {}
	const videosByChannel: { [key: string]: string[] } = {}
	const allVideoIds: string[] = []

	// Создаём каналы и пользователей
	console.log('Создание каналов и пользователей...')
	for (const channel of CHANNELS) {
		const password = '123456'
		const hashedPassword = await hash(password)

		const email = `${channel.slug}@test.com`

		const user = await prisma.user.create({
			data: {
				name: channel.name,
				email: email,
				password: hashedPassword
			}
		})

		const createdChannel = await prisma.channel.create({
			data: {
				slug: channel.slug,
				description: channel.description || '',
				avatarUrl: channel.avatarUrl || '',
				bannerUrl: channel.bannerUrl || '',
				isVerified: channel.isVerified || false,
				user: {
					connect: { id: user.id }
				}
			}
		})

		users.push(user)
		channelSlugToId[channel.slug] = createdChannel.id
		channelSlugToUserId[channel.slug] = user.id
		videosByChannel[channel.slug] = []
	}
	console.log('Каналы и пользователи созданы.')

	console.log('Создание категорий...')
	for (const category of CATEGORIES) {
		await prisma.category.upsert({
			where: { slug: category.slug },
			update: {},
			create: { name: category.name, slug: category.slug }
		})
	}
	console.log('Категории созданы.')

	// Создаём видео
	console.log('Создание видео, комментариев, лайков и тегов...')
	for (const videoData of VIDEOS) {
		// Получаем channelId из channelSlug
		const channelId = channelSlugToId[videoData.channelSlug]

		if (!channelId) {
			console.warn(
				`Канал с slug '${videoData.channelSlug}' не найден. Видео '${videoData.title}' пропущено.`
			)
			continue
		}

		// Генерируем случайную дату создания (от 0 до 365 дней назад)
		const createdAt = faker.date.between({
			from: faker.date.recent({
				days: 365
			}),
			to: new Date()
		})

		// Создаём видео
		const video = await prisma.video.create({
			data: {
				publicId: nanoid(10),
				title: videoData.title,
				description: videoData.description || '',
				thumbnailUrl: videoData.thumbnailUrl || '',
				videoFileName: videoData.videoFileName || '',
				maxResolution: videoData.maxResolution,
				viewsCount: videoData.viewsCount || 0,
				duration: faker.number.int({ min: 120, max: 1800 }),
				isPublic: videoData.isPublic || false,
				channelId: channelId,
				createdAt: createdAt,
				tags: {
					connectOrCreate: videoData.tags?.map(tagName => ({
						where: { name: tagName },
						create: { name: tagName }
					}))
				},
				categories: {
					connect: resolveCategorySlugs(videoData.title, videoData.tags).map(
						slug => ({
							slug
						})
					)
				}
			}
		})

		videosByChannel[videoData.channelSlug]?.push(video.id)
		allVideoIds.push(video.id)

		console.log(`Видео '${video.title}' создано.`)

		// Генерируем случайное количество комментариев (от 1 до 10)
		const numComments = faker.number.int({ min: 1, max: 10 })
		for (let i = 0; i < numComments; i++) {
			// Создаём нового пользователя для комментария
			const randomUser = await prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: await hash('123456')
				}
			})

			await prisma.videoComment.create({
				data: {
					text: faker.lorem.sentences(),
					userId: randomUser.id,
					videoId: video.id,
					createdAt: faker.date.between({ from: createdAt, to: new Date() })
				}
			})
		}

		// Генерируем случайное количество лайков (от 1 до 10)
		const numLikes = faker.number.int({ min: 1, max: 10 })
		const likedUserIds = new Set<string>()

		for (let i = 0; i < numLikes; i++) {
			// Создаём нового пользователя для лайка
			const randomUser = await prisma.user.create({
				data: {
					name: faker.person.fullName(),
					email: faker.internet.email(),
					password: await hash('123456')
				}
			})

			if (!likedUserIds.has(randomUser.id)) {
				likedUserIds.add(randomUser.id)

				await prisma.videoLike.create({
					data: {
						userId: randomUser.id,
						videoId: video.id,
						createdAt: faker.date.between({ from: createdAt, to: new Date() })
					}
				})
			}
		}
	}
	console.log('Видео, комментарии, лайки и теги созданы.')

	console.log('Создание плейлистов...')
	const playlistTitles = [
		'Relaxing Nature Sounds',
		'Instrumental Focus',
		'Meditation Guides',
		'Evolution',
		'Deep Work',
		'Late Night Vibes',
		'Morning Energy'
	]

	for (const channel of CHANNELS) {
		const channelVideos = videosByChannel[channel.slug] || []
		if (channelVideos.length < 2) continue

		const userId = channelSlugToUserId[channel.slug]
		const numPlaylists = faker.number.int({ min: 2, max: 6 })

		for (let i = 0; i < numPlaylists; i++) {
			const shuffled = faker.helpers.shuffle(channelVideos)
			const picked = shuffled.slice(
				0,
				faker.number.int({ min: 2, max: Math.min(8, channelVideos.length) })
			)

			await prisma.playlist.create({
				data: {
					title: faker.helpers.arrayElement(playlistTitles),
					coverUrl: `https://picsum.photos/seed/playlist-${channel.slug}-${i}/512/512`,
					userId,
					videos: {
						connect: picked.map(id => ({ id }))
					}
				}
			})
		}
	}
	console.log('Плейлисты созданы.')

	console.log('Создание лайков и истории для демо-аккаунта...')
	const demoUserId = channelSlugToUserId['maddixmusic']
	if (demoUserId && allVideoIds.length) {
		const demoVideos = faker.helpers
			.shuffle(allVideoIds)
			.slice(0, Math.min(12, allVideoIds.length))

		for (const videoId of demoVideos) {
			await prisma.videoLike.create({
				data: {
					userId: demoUserId,
					videoId,
					createdAt: faker.date.recent({ days: 30 })
				}
			})
			await prisma.watchHistory.create({
				data: {
					userId: demoUserId,
					videoId,
					watchedAt: faker.date.recent({ days: 5 })
				}
			})
		}
	}
	console.log('Лайки и история демо-аккаунта созданы.')

	console.log('Заполнение базы данных завершено успешно.')
}

main()
	.catch(e => {
		console.error('Ошибка при заполнении базы данных:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
