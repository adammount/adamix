import { type TextareaHTMLAttributes, useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	registration?: UseFormRegisterReturn
	wrapperClassName?: string
}

export function Textarea({
	label,
	error,
	registration,
	wrapperClassName,
	className,
	...props
}: Props) {
	const id = useId()

	return (
		<div className={twMerge('flex flex-col gap-[8rem]', wrapperClassName)}>
			{label && (
				<label htmlFor={id}>
					<span className='field-label'>{label}</span>
				</label>
			)}

			<textarea
				id={id}
				className={twMerge(
					'glass-input h-auto resize-none py-[14rem] leading-[22rem]',
					error && 'border-pinq-60',
					className
				)}
				{...registration}
				{...props}
			/>
			{error && <p className='text-[12rem] text-pinq-60'>{error}</p>}
		</div>
	)
}
