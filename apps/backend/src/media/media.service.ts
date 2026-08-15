import { BadRequestException, Injectable } from '@nestjs/common'

import { EnumVideoPlayerQuality } from '@/video/dto/video.types'
import * as ffmpeg from 'fluent-ffmpeg'
import { ensureDir, writeFile } from 'fs-extra'
import * as path from 'path'
import { generateFilename } from './generate-filename'
import { IFile, IMediaResponse } from './media.interface'
import { IResolution, RESOLUTIONS } from './resolution.data'

@Injectable()
export class MediaService {
	private readonly _outputDir = path.join(process.cwd(), 'uploads')

	private processingStatus: Map<string, number> = new Map()

	private readonly _allowedFolders = [
		'avatars',
		'banners',
		'thumbnails',
		'videos'
	]

	async saveMedia(
		files: IFile[],
		folder = 'videos'
	): Promise<IMediaResponse[]> {
		const folderLowerCase = folder.toLowerCase()
		if (!this._allowedFolders.includes(folderLowerCase)) {
			throw new BadRequestException(`Invalid folder name: ${folder}`)
		}
		const uploadFolder = path.join(this._outputDir, folderLowerCase)
		await ensureDir(uploadFolder)

		const file = files[0]

		const uniqueFileName = generateFilename(file?.originalname || file?.name)
		const filePath = path.join(uploadFolder, uniqueFileName)

		if (this.isVideo(file)) {
			await writeFile(filePath, file.buffer)

			const { width: inputWidth, height: inputHeight } =
				await this.getVideoResolution(filePath)

			const available = this.getAvailableResolutions(inputWidth, inputHeight)
			const maxResolution = available[0].name as EnumVideoPlayerQuality

			const playbackFileName = `${path.parse(uniqueFileName).name}.mp4`

			this.processingStatus.set(playbackFileName, 0)

			this.processVideo(filePath, playbackFileName, folderLowerCase)
				.then(() => {
					this.processingStatus.set(playbackFileName, 100)
				})
				.catch(err => {
					this.processingStatus.set(playbackFileName, -1)
					console.error('Video processing failed:', err)
				})

			return [
				{
					url: `/uploads/${folderLowerCase}/${playbackFileName}`,
					name: playbackFileName,
					maxResolution
				}
			]
		} else {
			await writeFile(filePath, file.buffer)

			return [
				{
					url: `/uploads/${folderLowerCase}/${uniqueFileName}`,
					name: uniqueFileName
				}
			]
		}
	}

	private isVideo(file: IFile): boolean {
		return file.mimetype.startsWith('video/')
	}

	private getAvailableResolutions(
		inputWidth: number,
		inputHeight: number
	): IResolution[] {
		const matched = RESOLUTIONS.filter(
			resolution =>
				resolution.width <= inputWidth && resolution.height <= inputHeight
		)

		return matched.length ? matched : [RESOLUTIONS[RESOLUTIONS.length - 1]]
	}

	private async processVideo(
		inputPath: string,
		fileName: string,
		folder: string
	): Promise<void> {
		try {
			const { width: inputWidth, height: inputHeight } =
				await this.getVideoResolution(inputPath)

			const availableResolutions = this.getAvailableResolutions(
				inputWidth,
				inputHeight
			)

			const totalResolutions = availableResolutions.length

			for (let i = 0; i < totalResolutions; i++) {
				const resolution = availableResolutions[i]

				await this.convertVideo(
					inputPath,
					resolution,
					fileName,
					folder,
					totalResolutions,
					i
				)
			}

			this.processingStatus.set(fileName, 100)
		} catch (err) {
			this.processingStatus.set(fileName, -1)
			console.error('Ошибка при обработке видео:', err)
		}
	}

	private getVideoResolution(
		filePath: string
	): Promise<{ width: number; height: number }> {
		return new Promise((resolve, reject) => {
			ffmpeg.ffprobe(filePath, (err, metadata) => {
				if (err) {
					reject(err)
				} else {
					const videoStream = metadata.streams.find(
						stream => stream.codec_type === 'video'
					)
					if (videoStream) {
						resolve({
							width: videoStream.width,
							height: videoStream.height
						})
					} else {
						reject(new Error('Видео поток не найден'))
					}
				}
			})
		})
	}

	private async convertVideo(
		inputPath: string,
		resolution: IResolution,
		fileName: string,
		folder: string,
		totalResolutions: number,
		currentResolutionIndex: number
	): Promise<void> {
		const outputDir = path.join(this._outputDir, folder, resolution.name)
		await ensureDir(outputDir)

		const outputPath = path.join(outputDir, fileName)

		return new Promise<void>((resolve, reject) => {
			ffmpeg(inputPath)
				.videoCodec('libx264')
				.audioCodec('aac')
				.outputOptions([
					'-vf',
					`scale=-2:${resolution.height}`,
					'-preset',
					'veryfast',
					'-crf',
					'23',
					'-movflags',
					'+faststart',
					'-f',
					'mp4'
				])
				.output(outputPath)
				.on('progress', progress => {
					const percent = progress.percent || 0

					const overallProgress =
						((currentResolutionIndex + percent / 100) / totalResolutions) * 100

					this.processingStatus.set(fileName, overallProgress)
				})
				.on('end', () => {
					resolve()
				})
				.on('error', err => {
					reject(err)
				})
				.run()
		})
	}

	getProcessingStatus(fileName: string): number {
		const status = this.processingStatus.get(fileName)
		return status === undefined ? 100 : status
	}

}
