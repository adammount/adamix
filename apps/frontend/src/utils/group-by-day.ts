import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

export function groupByDay<T>(items: T[], getDate: (item: T) => string) {
	const groups: { label: string; items: T[] }[] = []

	for (const item of items) {
		const date = dayjs(getDate(item))
		const label = date.calendar(null, {
			sameDay: '[Today]',
			lastDay: '[Yesterday]',
			lastWeek: 'MMM D, YYYY',
			sameElse: 'MMM D, YYYY'
		})

		const lastGroup = groups[groups.length - 1]
		if (lastGroup && lastGroup.label === label) {
			lastGroup.items.push(item)
		} else {
			groups.push({ label, items: [item] })
		}
	}

	return groups
}
