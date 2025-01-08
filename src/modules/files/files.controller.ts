import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FileDto } from './dtos/file.dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';

@Controller('files')
@ApiTags('Files')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private readonly service: FilesService) {}

  @Post('image')
  @ApiCreatedResponse({
    description: 'Upload file',
    type: FileDto,
  })
  @ApiBadRequestResponse({
    description: 'Upload failed',
    type: BadRequestDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: CommonErrorDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable entity',
    type: CommonErrorDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /.(jpeg|png|jpg)$/ }),
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ): Promise<FileDto> {
    const url: string = await this.service.uploadFile({
      fileName: file.originalname,
      dataBuffer: file.buffer,
      contentType: file.mimetype,
    });

    return new FileDto(url);
  }
}
