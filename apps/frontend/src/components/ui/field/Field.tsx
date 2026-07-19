import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	registration: UseFormRegisterReturn
}

export function Field({ label, error, registration, ...props }: Props) {
	return (
		<div className='flex flex-col gap-[8rem]'>
			<label className='flex flex-col gap-[8rem]'>
				<span className='field-label'>{label}</span>
				<input
					className={cn('glass-input', error && 'border-pinq-60')}
					{...registration}
					{...props}
				/>
			</label>
			{error && <p className='text-[12rem] text-pinq-60'>{error}</p>}
		</div>
	)
}
