import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'

const allowedMimeTypes = [
	'image/jpeg',
	'image/png',
	'video/mp4',
	'video/quicktime'
]

const MAX_FILE_SIZE = 300 * 1024 * 1024 // 300 МБ

function matchesSignature(buffer: Buffer, mimetype: string): boolean {
	if (!buffer || buffer.length < 12) return false

	switch (mimetype) {
		case 'image/jpeg':
			return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
		case 'image/png':
			return (
				buffer[0] === 0x89 &&
				buffer[1] === 0x50 &&
				buffer[2] === 0x4e &&
				buffer[3] === 0x47
			)
		case 'video/mp4':
		case 'video/quicktime':
			return buffer.toString('ascii', 4, 8) === 'ftyp'
		default:
			return false
	}
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
	transform(value: any, _metadata: ArgumentMetadata) {
		const files = Array.isArray(value) ? value : [value]

		for (const file of files) {
			if (!file || !file.mimetype) {
				throw new BadRequestException('No file provided')
			}

			if (!allowedMimeTypes.includes(file.mimetype)) {
				throw new BadRequestException(`Unsupported file type`)
			}

			if (file.size > MAX_FILE_SIZE) {
				throw new BadRequestException(`File size is too big`)
			}

			if (!matchesSignature(file.buffer, file.mimetype)) {
				throw new BadRequestException(`File content does not match its type`)
			}
		}

		return value
	}
}
