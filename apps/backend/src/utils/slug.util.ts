export function slugifyEmail(email: string) {
	return (
		email
			.split('@')[0]
			.toLowerCase()
			.replace(/[^a-z0-9]/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '') || 'channel'
	)
}

export async function generateUniqueSlug(
	base: string,
	isTaken: (slug: string) => Promise<boolean>
) {
	let slug = base
	let attempt = 0

	while (await isTaken(slug)) {
		attempt++
		slug = `${base}-${attempt}`
	}

	return slug
}
