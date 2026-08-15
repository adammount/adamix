import axios from 'axios'

export function getErrorMessage(error: unknown, fallback = 'Something went wrong') {
	if (!axios.isAxiosError(error)) return fallback

	const message = error.response?.data?.message

	if (Array.isArray(message)) return message.join(', ')
	if (typeof message === 'string' && message) return message

	return fallback
}
