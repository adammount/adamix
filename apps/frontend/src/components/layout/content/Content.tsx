import { type PropsWithChildren, memo } from 'react'

export const Content = memo(function Content({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='relative min-w-0 flex-1'>
			<section>{children}</section>
		</div>
	)
})
