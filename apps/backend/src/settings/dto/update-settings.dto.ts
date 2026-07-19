import {
	IsBoolean,
	IsInt,
	IsOptional,
	IsString,
	Max,
	Min
} from 'class-validator'

export class UpdateSettingsDto {
	@IsOptional()
	@IsBoolean()
	emailNotifications?: boolean

	@IsOptional()
	@IsBoolean()
	pushNotifications?: boolean

	@IsOptional()
	@IsBoolean()
	newVideoAlerts?: boolean

	@IsOptional()
	@IsBoolean()
	commentMentions?: boolean

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(100)
	frequency?: number

	@IsOptional()
	@IsBoolean()
	profileVisibility?: boolean

	@IsOptional()
	@IsBoolean()
	watchHistory?: boolean

	@IsOptional()
	@IsBoolean()
	activityStatus?: boolean

	@IsOptional()
	@IsString()
	defaultQuality?: string

	@IsOptional()
	@IsBoolean()
	autoplay?: boolean

	@IsOptional()
	@IsString()
	language?: string

	@IsOptional()
	@IsBoolean()
	dataSaver?: boolean

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(100)
	bufferSize?: number
}
