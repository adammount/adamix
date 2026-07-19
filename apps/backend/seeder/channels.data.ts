import { Channel } from '@/generated/prisma'

export const CHANNELS: Partial<Channel & { name: string }>[] = [
	{
		name: 'Maddix // EXTATIC',
		slug: 'maddixmusic',
		description:
			'Dutch DJ/producer Maddix is known for his genre-breaking techno-rave sound, infused with big room and trance influences.',
		avatarUrl: 'https://picsum.photos/seed/maddix-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/maddix-banner/1920/480',
		isVerified: true
	},
	{
		name: 'John Summit',
		slug: 'johnsummit',
		description: 'forever trying to find comfort in chaos..',
		avatarUrl: 'https://picsum.photos/seed/johnsummit-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/johnsummit-banner/1920/480',
		isVerified: true
	},
	{
		name: 'Tomorrowland',
		slug: 'tomorrowlandchannel',
		description:
			'Relive all the magical moments of Tomorrowland all year long.',
		avatarUrl: 'https://picsum.photos/seed/tomorrowland-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/tomorrowland-banner/1920/480',
		isVerified: true
	},
	{
		name: 'Nova Sessions',
		slug: 'novasessions',
		description:
			'Melodic house and techno sessions, recorded live from rooftops, warehouses and open-air stages.',
		avatarUrl: 'https://picsum.photos/seed/nova-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/nova-banner/1920/480',
		isVerified: true
	},
	{
		name: 'VISUALDON',
		slug: 'visualdon',
		description: '3D Visual Artist. I make Retro & Space visuals.',
		avatarUrl: 'https://picsum.photos/seed/visualdon-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/visualdon-banner/1920/480',
		isVerified: true
	},
	{
		name: 'SpawnPoiint',
		slug: 'spawnpoiint',
		description:
			'Weekly videos about tech, gaming and setups. Console reviews, desk tours and everything in between.',
		avatarUrl: 'https://picsum.photos/seed/spawn-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/spawn-banner/1920/480',
		isVerified: true
	},
	{
		name: 'Kira Plays',
		slug: 'kiraplays',
		description:
			'Стримлю соулслайки, инди и всё, что заставляет страдать. Хайлайты с твича по вторникам и пятницам.',
		avatarUrl: 'https://picsum.photos/seed/kira-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/kira-banner/1920/480'
	},
	{
		name: 'Maisy Leigh',
		slug: 'maisyleigh',
		description:
			'Hi! I`m Maisy! Bringing cozy creations to life, finding my zen, and sharing my cozy lifestyle :)',
		avatarUrl: 'https://picsum.photos/seed/maisy-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/maisy-banner/1920/480',
		isVerified: true
	},
	{
		name: 'Дом на колёсах',
		slug: 'vanlife',
		description:
			'Тревел-влоги из фургона: маршруты, ночёвки в горах, быт на четырёх колёсах и честная стоимость дороги.',
		avatarUrl: 'https://picsum.photos/seed/vanlife-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/vanlife-banner/1920/480'
	},
	{
		name: 'Slow Kitchen',
		slug: 'slowkitchen',
		description:
			'Спокойные рецепты без спешки: сезонные продукты, много света и минимум посуды.',
		avatarUrl: 'https://picsum.photos/seed/slowkitchen-avatar/256/256',
		bannerUrl: 'https://picsum.photos/seed/slowkitchen-banner/1920/480'
	}
]
