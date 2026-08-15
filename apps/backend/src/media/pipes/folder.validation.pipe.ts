import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'

const allowedFolders = ['avatars', 'banners', 'thumbnails', 'videos']

@Injectable()
export class FolderValidationPipe implements PipeTransform {
	transform(value: unknown, metadata: ArgumentMetadata) {
		if (metadata.type !== 'query') {
			return value
		}

		if (!value || !allowedFolders.includes(String(value).toLowerCase())) {
			throw new BadRequestException(`Invalid folder name: ${value}`)
		}

		return value
	}
}
