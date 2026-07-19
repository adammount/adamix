import dayjs from 'dayjs'
import relativeDate from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeDate)

export function transformDate(createdAt: string): string {
	return dayjs(createdAt).fromNow()
}

export function transformFullDate(date: string): string {
	return dayjs(date).format('MMM D, YYYY')
}
