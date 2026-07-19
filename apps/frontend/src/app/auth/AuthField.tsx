import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	registration: UseFormRegisterReturn
}

export function AuthField({ label, error, registration, ...props }: Props) {
	return (
		<div className='flex flex-col gap-[8rem]'>
			<label className='flex flex-col gap-[8rem]'>
				<span className='text-[12rem] text-white-60'>{label}</span>
				<input
					className={cn(
						'h-[44rem] w-full rounded-[16rem] border bg-white-15 px-[16rem] text-[14rem] text-white outline-none backdrop-blur-[8rem] transition-base placeholder:text-white-40 focus:border-brown-light',
						error ? 'border-pinq-60' : 'border-white-15'
					)}
					{...registration}
					{...props}
				/>
			</label>
			{error && <p className='text-[12rem] text-pinq-60'>{error}</p>}
		</div>
	)
}
