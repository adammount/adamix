'use client'

import dynamic from 'next/dynamic'
import { forwardRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Logo } from '@/ui/icons/Logo'

import { AuthField } from './AuthField'
import { SwitchAuth } from './SwitchAuth'
import type { IAuthForm } from './auth-form.types'
import { useAuthForm } from './useAuthForm'

const DynamicRecaptcha = dynamic(() => import('./Recaptcha').then(mod => mod.Recaptcha))
const ForwardedRefRecaptcha = forwardRef<ReCAPTCHA>((props, ref) => (
	<DynamicRecaptcha
		{...props}
		forwardedRef={ref}
	/>
))
ForwardedRefRecaptcha.displayName = 'ForwardedRefRecaptcha'

export function Auth() {
	const [isLogin, setIsLogin] = useState(true)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { isLoading, onSubmit, recaptchaRef } = useAuthForm(isLogin ? 'login' : 'register', reset)

	return (
		<div className='relative flex min-h-screen items-center justify-center overflow-hidden px-[16rem]'>
			<div className='pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden md:block'>
				<div className='blob-1 absolute -left-[177rem] -top-[172rem] size-[700rem] rounded-full bg-green-60 blur-[150rem]' />
				<div className='blob-2 absolute right-0 top-[88rem] size-[800rem] rounded-full bg-pinq-60 blur-[180rem]' />
				<div className='blob-3 absolute -left-[123rem] top-[408rem] size-[500rem] rounded-full bg-brown-light/20 blur-[150rem]' />
			</div>

			<div className='flex w-[400rem] max-w-full flex-col gap-[24rem] rounded-[40rem] border border-white-15 bg-white-15 p-[32rem] backdrop-blur-[16rem]'>
				<div className='flex flex-col items-center gap-[12rem]'>
					<Logo className='h-[48rem] w-auto' />
					<h1 className='font-heading text-[24rem] text-white'>
						{isLogin ? 'Welcome back' : 'Create account'}
					</h1>
				</div>

				<SwitchAuth
					isLogin={isLogin}
					setIsLogin={setIsLogin}
				/>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-[16rem]'
				>
					{isLoading ? (
						<SkeletonLoader
							count={3}
							className='h-[44rem] rounded-[16rem]'
						/>
					) : (
						<>
							<AuthField
								label='Email'
								type='email'
								registration={register('email', { required: 'Email is required!' })}
								error={errors.email?.message}
								placeholder='Enter email'
							/>
							<AuthField
								label='Password'
								type='password'
								registration={register('password', { required: 'Password is required!' })}
								error={errors.password?.message}
								placeholder='Enter password'
							/>
							{!isLogin && (
								<AuthField
									label='Password confirmation'
									type='password'
									registration={register('confirmPassword', {
										required: 'Password confirmation is required!',
										validate: value => value === watch('password') || 'Passwords don`t match!'
									})}
									error={errors.confirmPassword?.message}
									placeholder='Enter password again'
								/>
							)}

							<ForwardedRefRecaptcha ref={recaptchaRef} />
						</>
					)}

					<button
						type='submit'
						disabled={isLoading}
						className='mt-[8rem] h-[44rem] rounded-[16rem] bg-brown-light text-[14rem] font-semibold text-dark-brown transition-base hover-desktop:opacity-90 disabled-state'
					>
						{isLoading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
					</button>
				</form>
			</div>
		</div>
	)
}
