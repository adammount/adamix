import { EnumVideoPlayerQuality } from '@/video/dto/video.types'

export const VIDEOS = [
	{
		title: 'Frankyeffe & MOTVS - Fall Down',
		viewsCount: 12992,
		thumbnailUrl: 'https://picsum.photos/seed/falldown/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Новый релиз на EXTATIC Records. Тёмный техно-рейв с вокальным сэмплом и живой партией баса.</p>',
		channelSlug: 'maddixmusic',
		isPublic: true,
		tags: ['frankyeffe', 'motvs', 'fall down', 'music', 'edm', 'techno']
	},
	{
		title: 'Maddix presents XTTC Radio 001',
		viewsCount: 29700,
		thumbnailUrl: 'https://picsum.photos/seed/xttc001/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Каждую первую пятницу месяца — XTTC Radio. Час треков, которые я играю на площадках по всему миру.</p><p>В выпуске: Eli Brown, Lilly Palmer, Amelie Lens, John Summit, Hi-Lo и другие.</p>',
		channelSlug: 'maddixmusic',
		isPublic: true,
		tags: ['xttc', 'radio', 'techno', 'mix', 'music', 'edm']
	},
	{
		title: 'John Summit Live @ Madison Square Garden',
		viewsCount: 575550,
		thumbnailUrl: 'https://picsum.photos/seed/msg-live/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Полный сет с Madison Square Garden. Отдельное спасибо команде, которая собрала эту сцену.</p>',
		channelSlug: 'johnsummit',
		isPublic: true,
		tags: ['john summit', 'live set', 'music', 'edm', 'house']
	},
	{
		title: 'John Summit - Tears (with Paige Cavell) [Max Styler Remix]',
		viewsCount: 35615,
		thumbnailUrl: 'https://picsum.photos/seed/tears-remix/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Ремикс Max Styler на «Tears» — быстрее, жёстче и с переработанным дропом.</p>',
		channelSlug: 'johnsummit',
		isPublic: true,
		tags: ['john summit', 'tears', 'remix', 'music', 'edm', 'house']
	},
	{
		title: 'Anyma WE1 | Tomorrowland 2024',
		viewsCount: 1155227,
		thumbnailUrl: 'https://picsum.photos/seed/anyma-we1/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>История, разворачивающаяся в мифическом мире Silvyra — со своими существами, растениями и живущими в согласии людьми.</p>',
		channelSlug: 'tomorrowlandchannel',
		isPublic: true,
		tags: ['anyma', 'tomorrowland', 'mainstage', 'edm', 'music', 'festival']
	},
	{
		title: 'Swedish House Mafia WE2 | Tomorrowland 2024',
		viewsCount: 2694421,
		thumbnailUrl: 'https://picsum.photos/seed/shm-we2/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Закрытие второго уикенда на главной сцене. Полная запись выступления без сокращений.</p>',
		channelSlug: 'tomorrowlandchannel',
		isPublic: true,
		tags: [
			'swedish house mafia',
			'tomorrowland',
			'mainstage',
			'music',
			'edm',
			'festival'
		]
	},
	{
		title: 'Sunset Rooftop Set — Melodic House & Techno',
		viewsCount: 184300,
		thumbnailUrl: 'https://picsum.photos/seed/rooftop-set/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Полтора часа мелодичного хауса на крыше, записанные на закате одним дублем. Трек-лист в закреплённом комментарии.</p>',
		channelSlug: 'novasessions',
		isPublic: true,
		tags: ['melodic house', 'techno', 'live set', 'sunset', 'music', 'edm']
	},
	{
		title: 'Warehouse Session #14 — Vinyl Only',
		viewsCount: 96420,
		thumbnailUrl: 'https://picsum.photos/seed/warehouse-14/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Сет целиком с винила: две вертушки, микшер и ни одного цифрового трека.</p>',
		channelSlug: 'novasessions',
		isPublic: true,
		tags: ['vinyl', 'warehouse', 'techno', 'dj set', 'music']
	},
	{
		title: 'Above The Neon City - 12 Hours - 4K Ultra HD 60fps',
		viewsCount: 58181,
		thumbnailUrl: 'https://picsum.photos/seed/neon-city/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Машина летит над киберпанк-городом ночью под синтвейв. Двенадцать часов бесшовного лупа.</p>',
		channelSlug: 'visualdon',
		isPublic: true,
		tags: ['cyberpunk', 'city', 'night', 'synthwave', 'visual', 'ambient']
	},
	{
		title: 'VISUALDON - Showreel',
		viewsCount: 2303,
		thumbnailUrl: 'https://picsum.photos/seed/visualdon-reel/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Шоурил лучших работ за последние годы. Спасибо за просмотр.</p>',
		channelSlug: 'visualdon',
		isPublic: true,
		tags: ['showreel', 'portfolio', 'visual', '3d', 'motion']
	},
	{
		title: 'The 10 Best PS5 Accessories Worth Buying',
		viewsCount: 97212,
		thumbnailUrl: 'https://picsum.photos/seed/ps5-gear/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Лучшие аксессуары для PS5 прямо сейчас: что действительно стоит своих денег, а что — маркетинг.</p>',
		channelSlug: 'spawnpoiint',
		isPublic: true,
		tags: ['ps5', 'playstation', 'accessories', 'gaming', 'tech', 'game']
	},
	{
		title: 'Top 10 MUST-PLAY Games Coming in October',
		viewsCount: 85429,
		thumbnailUrl: 'https://picsum.photos/seed/october-games/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Главные релизы октября на PS5, Xbox Series, PC и Switch — включая пару проектов, о которых почти никто не говорит.</p>',
		channelSlug: 'spawnpoiint',
		isPublic: true,
		tags: ['games', 'gaming', 'releases', 'pc', 'console', 'game']
	},
	{
		title: 'Прошла босса с 47 попытки — полный хайлайт',
		viewsCount: 143870,
		thumbnailUrl: 'https://picsum.photos/seed/boss-run/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Полтора часа страданий ужаты в один хайлайт. Реакция чата не вырезана.</p>',
		channelSlug: 'kiraplays',
		isPublic: true,
		tags: ['стрим', 'соулслайк', 'босс', 'хайлайты', 'gaming', 'game']
	},
	{
		title: 'Стрим-сетап 2025: свет, звук и что я поменяла',
		viewsCount: 61240,
		thumbnailUrl: 'https://picsum.photos/seed/stream-setup/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Разбор рабочего места стримера: микрофон, свет, камера и почему я отказалась от второго монитора.</p>',
		channelSlug: 'kiraplays',
		isPublic: true,
		tags: ['сетап', 'стрим', 'оборудование', 'tech', 'setup']
	},
	{
		title: 'My Cozy Desk Setup | Standing Desk, 5K Monitor, Zen & Earthy',
		viewsCount: 174175,
		thumbnailUrl: 'https://picsum.photos/seed/cozy-desk/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Тур по рабочему месту, где я нахожу свой дзен и вдохновение. Чистое пространство — чистые мысли.</p>',
		channelSlug: 'maisyleigh',
		isPublic: true,
		tags: ['desk setup', 'workspace', 'home office', 'productivity', 'cozy']
	},
	{
		title: 'Утренние ритуалы: как я начинаю день без спешки',
		viewsCount: 88960,
		thumbnailUrl: 'https://picsum.photos/seed/morning-ritual/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Медленное утро: кофе, дневник, немного растяжки и почему я перестала проверять телефон до завтрака.</p>',
		channelSlug: 'maisyleigh',
		isPublic: true,
		tags: ['lifestyle', 'утро', 'рутина', 'productivity', 'cozy']
	},
	{
		title: 'Две недели в фургоне по горному серпантину',
		viewsCount: 226410,
		thumbnailUrl: 'https://picsum.photos/seed/vanlife-road/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Маршрут на 1800 километров, три перевала и ночёвки на высоте. Считаем бензин, еду и стоянки.</p>',
		channelSlug: 'vanlife',
		isPublic: true,
		tags: ['travel', 'vanlife', 'горы', 'путешествие', 'влог']
	},
	{
		title: 'Что сломалось в фургоне за год жизни в дороге',
		viewsCount: 134720,
		thumbnailUrl: 'https://picsum.photos/seed/van-repair/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Честный разбор поломок: отопитель, водяной насос, электрика. Сколько стоило и что бы я сделал иначе.</p>',
		channelSlug: 'vanlife',
		isPublic: true,
		tags: ['vanlife', 'ремонт', 'travel', 'влог', 'опыт']
	},
	{
		title: 'Хлеб на закваске без миксера — от старта до буханки',
		viewsCount: 312050,
		thumbnailUrl: 'https://picsum.photos/seed/sourdough/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Полный цикл за трое суток: выведение закваски, автолиз, складывания и выпечка в казане.</p>',
		channelSlug: 'slowkitchen',
		isPublic: true,
		tags: ['рецепт', 'хлеб', 'закваска', 'cooking', 'food']
	},
	{
		title: 'Осенний суп из тыквы: три способа, один результат',
		viewsCount: 97530,
		thumbnailUrl: 'https://picsum.photos/seed/pumpkin-soup/1280/720',
		videoFileName: 'placeholder.mp4',
		maxResolution: EnumVideoPlayerQuality['720p'],
		description:
			'<p>Запекание, обжарка и варка — сравниваем вкус и текстуру. Спойлер: разница заметнее, чем кажется.</p>',
		channelSlug: 'slowkitchen',
		isPublic: true,
		tags: ['рецепт', 'суп', 'тыква', 'cooking', 'food', 'осень']
	}
]
