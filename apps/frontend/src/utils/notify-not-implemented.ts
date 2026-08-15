export async function notifyNotImplemented() {
	const { toast } = await import('react-hot-toast')
	toast('This feature is not implemented yet', {
		id: 'not-implemented',
		icon: '🚧'
	})
}
