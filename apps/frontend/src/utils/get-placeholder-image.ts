const PLACEHOLDER_HOST = 'https://picsum.photos/seed'

export function getPlaceholderImage(seed: string, width: number, height = width) {
	return `${PLACEHOLDER_HOST}/${seed}/${width}/${height}`
}

export function getAvatarUrl(avatarUrl: string | null | undefined, seed: string, size: number) {
	return avatarUrl || getPlaceholderImage(seed, size)
}
