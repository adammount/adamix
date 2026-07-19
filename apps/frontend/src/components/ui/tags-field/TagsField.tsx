import cn from 'clsx'
import { type ChangeEvent, type KeyboardEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface TagsFieldProps {
	label: string
	placeholder?: string
	error?: string
	tags: string[]
	onTagsChange: (tags: string[]) => void
	className?: string
}

export function TagsField({
	label,
	placeholder = 'Enter tags:',
	error,
	tags = [],
	onTagsChange,
	className
}: TagsFieldProps) {
	const [inputValue, setInputValue] = useState<string>('')

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ',' || e.key === 'Enter') {
			e.preventDefault()
			addTag(inputValue.trim())
		} else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
			e.preventDefault()
			removeTag(tags[tags.length - 1].trim())
		}
	}

	const addTag = (tag: string) => {
		if (tag && !tags.includes(tag)) {
			const newTags = [...tags, tag]
			setInputValue('')
			onTagsChange(newTags)
		}
	}

	const removeTag = (tag: string) => {
		const newTags = tags.filter(t => t !== tag)
		onTagsChange(newTags)
	}

	return (
		<div className={twMerge('flex flex-col gap-[8rem]', className)}>
			<label className='flex flex-col gap-[8rem]'>
				<span className='text-[12rem] text-white-60'>{label}</span>
				<div
					className={cn(
						'flex w-full flex-wrap gap-[8rem] rounded-[24rem] border bg-white-15 px-[20rem] py-[12rem] backdrop-blur-[16rem] transition-base focus-within:border-brown-light',
						error ? 'border-pinq-60' : 'border-white-15'
					)}
				>
					{tags.map(tag => (
						<div
							key={tag}
							className='flex items-center gap-[6rem] rounded-[16rem] bg-white-25 px-[12rem] py-[4rem] text-[12rem] text-white'
						>
							<span>{tag}</span>
							<button
								type='button'
								onClick={e => {
									e.preventDefault()
									removeTag(tag.trim())
								}}
								className='text-white-60 transition-fast hover-desktop:text-white'
							>
								&times;
							</button>
						</div>
					))}
					<input
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className='flex-grow bg-transparent text-[14rem] text-white outline-none placeholder:text-white-40'
					/>
				</div>
			</label>
			{error && <p className='text-[12rem] text-pinq-60'>{error}</p>}
		</div>
	)
}
