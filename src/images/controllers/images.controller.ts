import { Controller, Post, UploadedFile, UseInterceptors, Request, Inject, Delete, Put, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiConsumes } from '@nestjs/swagger';
import { BadRequestException } from '@nestjs/common';
import { ImagesDiTokens } from '../di/images-tokens.di';
import { SaveImageDTO, SaveImageUseCase } from '../services/usecases/save-image.usecase';
import { DeleteImageUseCase } from '../services/usecases/delete-image.usecase';
import { FindImageUseCase } from '../services/usecases/find-image.usecase';

@Controller('images')
export class ImagesController {
    constructor(
        @Inject(ImagesDiTokens.SaveImageService)
        private readonly saveImageService: SaveImageUseCase,
        @Inject(ImagesDiTokens.DeleteImageService)
        private readonly deleteImageService: DeleteImageUseCase,
        @Inject(ImagesDiTokens.FindImageService)
        private readonly findImageService: FindImageUseCase
    ) { }

    @Post('')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: memoryStorage(),
            limits: { fileSize: 2097152 },
            fileFilter: (req, file, callback) => {
                return file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)
                    ? callback(null, true)
                    : callback(new BadRequestException('Only image files are allowed'), false);
            }
        })
    )
    async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Request() req
    ) {
        const userId = req.user.userId;

        if (!file) {
            throw new BadRequestException('File is required');
        }

        const image: SaveImageDTO = await this.saveImageService.execute({
            userId: userId,
            image: {
                buffer: file.buffer,
                originalName: file.originalname,
                mimetype: file.mimetype,
                fileName: file.filename,
            }
        });

        return { image };
    }

    @Delete('')
    async deleteImage(
        @Request() req
    ) {
        const userId = req.user.userId;
        await this.deleteImageService.execute({ userId: userId });

        return { message: 'successfully deleted image' };
    }

    @Get('')
    async findImage(
        @Request() req
    ) {
        const userId: number = req.user.userId;

        return { publicUrl: (await this.findImageService.execute({ userId: userId })).url };
    }
}
