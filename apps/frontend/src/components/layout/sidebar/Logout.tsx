'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { SidebarItem } from '@/components/layout/sidebar/SidebarItem'

import { PAGE } from '@/config/public-page.config'

import { authService } from '@/services/auth.service'
import { useTypedSelector } from '@/store'

export function Logout() {
	const router = useRouter()
	const pathname = usePathname()
	const queryClient = useQueryClient()

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSettled: () => {
			authService.removeFromStorage()
			queryClient.clear()

			const isProtected = pathname.startsWith('/studio') || pathname.startsWith('/my')
			router.push(isProtected ? PAGE.HOME : pathname)
			router.refresh()
		}
	})

	if (!isLoggedIn) return null

	return (
		<SidebarItem
			icon={LogOut}
			label={isPending ? 'Please wait...' : 'Logout'}
			onClick={() => mutate()}
		/>
	)
}
