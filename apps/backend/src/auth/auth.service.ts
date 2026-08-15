import { EmailService } from '@/email/email.service'
import { PrismaService } from '@/prisma.service'
import { UserService } from '@/user/user.service'
import { generateUniqueSlug, slugifyEmail } from '@/utils/slug.util'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@/generated/prisma'
import { hash, verify } from 'argon2'
import { omit } from 'lodash'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private jwt: JwtService,
		private userService: UserService,
		private emailService: EmailService,
		private prisma: PrismaService
	) {}

	private readonly TOKEN_EXPIRATION_ACCESS = '1h'
	private readonly TOKEN_EXPIRATION_REFRESH = '7d'

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		return this.buildResponseObject(user)
	}

	async register(dto: AuthDto) {
		const userExists = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})
		if (userExists) {
			throw new BadRequestException('User already exists')
		}
		const user = await this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password),
				channel: {
					create: {
						slug: await this.generateChannelSlug(dto.email)
					}
				}
			}
		})

		const apiUrl = process.env.API_URL || 'http://localhost:4200'
		this.emailService
			.sendVerification(
				user.email,
				`${apiUrl}/verify-email?token=${user.verificationToken}`
			)
			.catch(err => {
				console.error('Не удалось отправить письмо подтверждения:', err)
			})

		return this.buildResponseObject(user)
	}

	private async generateChannelSlug(email: string) {
		return generateUniqueSlug(slugifyEmail(email), async candidate =>
			Boolean(
				await this.prisma.channel.findUnique({
					where: { slug: candidate },
					select: { id: true }
				})
			)
		)
	}

	async getNewTokens(refreshToken: string) {
		let result: { id: string; type?: string }
		try {
			result = await this.jwt.verifyAsync(refreshToken)
		} catch {
			throw new UnauthorizedException('Invalid refresh token')
		}
		if (result.type !== 'refresh') {
			throw new UnauthorizedException('Invalid refresh token')
		}
		const user = await this.userService.byId(result.id)
		return this.buildResponseObject(user)
	}

	async verifyEmail(token: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				verificationToken: token
			}
		})

		if (!user) throw new NotFoundException('Token not exists!')

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				verificationToken: null
			}
		})

		return 'Email verified!'
	}

	async buildResponseObject(user: Omit<User, 'password'>) {
		const tokens = await this.issueTokens(user.id)
		return { user, ...tokens }
	}

	private async issueTokens(userId: string) {
		const accessToken = this.jwt.sign(
			{ id: userId, type: 'access' },
			{
				expiresIn: this.TOKEN_EXPIRATION_ACCESS
			}
		)
		const refreshToken = this.jwt.sign(
			{ id: userId, type: 'refresh' },
			{
				expiresIn: this.TOKEN_EXPIRATION_REFRESH
			}
		)
		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})
		if (!user) {
			throw new UnauthorizedException('Email or password invalid')
		}
		const isValid = await verify(user.password, dto.password)
		if (!isValid) {
			throw new UnauthorizedException('Email or password invalid')
		}
		return user
	}

	private omitPassword(user: User) {
		return omit(user, ['password'])
	}
}
