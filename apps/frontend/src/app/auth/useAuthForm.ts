import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useTransition } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import type { SubmitHandler, UseFormReset } from 'react-hook-form'

import { PAGE } from '@/config/public-page.config'

import type { IAuthData, IAuthForm } from './auth-form.types'
import { authService } from '@/services/auth.service'

export function useAuthForm(type: 'login' | 'register', reset: UseFormReset<IAuthForm>) {
	const router = useRouter()
	const queryClient = useQueryClient()

	const [isPending, startTransition] = useTransition()

	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const { mutateAsync, isPending: isAuthPending } = useMutation({
		mutationKey: [type],
		mutationFn: ({ recaptchaToken, ...data }: IAuthData & { recaptchaToken?: string | null }) =>
			authService.main(type, data, recaptchaToken),
		onSettled() {
			recaptchaRef.current?.reset()
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = async ({ email, password }) => {
		const token = recaptchaRef.current?.getValue()
		const { toast } = await import('react-hot-toast')

		const isDev = process.env.NODE_ENV !== 'production'

		if (!token && !isDev) {
			toast.error('Pass the captcha!', {
				id: 'recaptcha'
			})
			return
		}

		toast.promise(
			mutateAsync({
				email,
				password,
				recaptchaToken: token
			}),
			{
				loading: 'Loading...',
				success: () => {
					queryClient.clear()

					startTransition(() => {
						reset()
						router.replace(PAGE.HOME)
						router.refresh()
					})

					return 'Success login!'
				},
				error: (e: unknown) => {
					if (axios.isAxiosError(e)) {
						return e.response?.data?.message ?? 'Something went wrong'
					}
					return 'Something went wrong'
				}
			}
		)
	}

	const isLoading = isPending || isAuthPending

	return {
		onSubmit,
		recaptchaRef,
		isLoading
	}
}
