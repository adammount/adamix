interface Props {
	title: string
	description?: string
}

export function EmptyState({ title, description }: Props) {
	return (
		<div className='flex w-full flex-col items-center gap-[8rem] py-[60rem] text-center'>
			<p className='text-[18rem] text-white'>{title}</p>
			{description && (
				<p className='text-[14rem] text-white-60'>{description}</p>
			)}
		</div>
	)
}
