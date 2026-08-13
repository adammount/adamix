'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'

import { store } from '@/store'

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1,
						refetchOnWindowFocus: false
					},
					mutations: {
						retry: 1
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				{children}
				<ServiceWorkerRegister />
				<InstallPrompt />
				<Toaster
					toastOptions={{
						style: {
							backgroundColor: '#202937',
							color: 'white',
							fontSize: '14px',
							lineHeight: '20px',
							maxWidth: '90vw',
							padding: '12px 16px',
							borderRadius: '12px'
						}
					}}
				/>
			</Provider>
		</QueryClientProvider>
	)
}
