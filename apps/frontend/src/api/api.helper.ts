import { isAxiosError } from 'axios'

export const errorCatch = (error: unknown): string => {
	if (isAxiosError(error)) {
		const message = error.response?.data?.message

		return message ? (Array.isArray(message) ? message[0] : message) : error.message
	}

	return error instanceof Error ? error.message : String(error)
}
