import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'

const allowedMimeTypes = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
	'video/mp4',
	'video/quicktime',
	'video/webm',
	'video/x-matroska'
]

const MAX_FILE_SIZE = 300 * 1024 * 1024 // 300 МБ

function matchesSignature(buffer: Buffer, mimetype: string): boolean {
	if (!buffer || buffer.length < 12) return false

	switch (mimetype) {
		case 'image/jpeg':
		case 'image/jpg':
			return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
		case 'image/png':
			return (
				buffer[0] === 0x89 &&
				buffer[1] === 0x50 &&
				buffer[2] === 0x4e &&
				buffer[3] === 0x47
			)
		case 'image/webp':
			return (
				buffer.toString('ascii', 0, 4) === 'RIFF' &&
				buffer.toString('ascii', 8, 12) === 'WEBP'
			)
		case 'video/mp4':
		case 'video/quicktime':
			return buffer.toString('ascii', 4, 8) === 'ftyp'
		case 'video/webm':
		case 'video/x-matroska':
			return (
				buffer[0] === 0x1a &&
				buffer[1] === 0x45 &&
				buffer[2] === 0xdf &&
				buffer[3] === 0xa3
			)
		default:
			return false
	}
}

interface IUploadedFile {
	mimetype: string
	size: number
	buffer: Buffer
}

function isUploadedFile(value: unknown): value is IUploadedFile {
	return Boolean(value) && typeof (value as IUploadedFile).mimetype === 'string'
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
	transform(value: unknown, _metadata: ArgumentMetadata) {
		const files: unknown[] = Array.isArray(value) ? value : [value]

		for (const file of files) {
			if (!isUploadedFile(file)) {
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
