import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileDto } from './dtos/file.dto';

@Controller('files')
@ApiTags('Files')
@ApiBearerAuth('Authorization')
export class FilesController {

    constructor(
        private readonly service: FilesService
    ) {}

    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<FileDto> {

        const url: string = await this.service.uploadFile({
            fileName: file.originalname,
            dataBuffer: file.buffer,
            contentType: file.mimetype
        });

        return {
            url
        };
    }
}
