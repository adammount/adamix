import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import type { Request } from 'express'

@Injectable()
export class OriginGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>()
		const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3000'

		const origin = request.headers.origin
		const referer = request.headers.referer

		const source = origin ?? (referer ? new URL(referer).origin : undefined)

		if (source !== allowedOrigin) {
			throw new ForbiddenException('Invalid request origin')
		}

		return true
	}
}
