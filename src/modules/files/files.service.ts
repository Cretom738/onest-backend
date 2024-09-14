import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IFilesService } from './files';
import { ConfigService } from '@nestjs/config';
import { S3 } from '@aws-sdk/client-s3';
import { IFile } from 'src/libs/interfaces/file.interface';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class FilesService implements IFilesService {

    private readonly logger: Logger = new Logger(FilesService.name);
    private readonly s3: S3;

    constructor(
        private configService: ConfigService
    ) {
        this.s3 = new S3({ 
            credentials: { 
                accessKeyId: configService.get('ACCESS_KEY'),
                secretAccessKey: configService.get('SECRET_KEY')
            },
            region: configService.get('REGION'),
            endpoint: configService.get('BUCKET_ENDPOINT'),
            apiVersion: 'latest'
        });
    }

    async uploadFile({ dataBuffer, fileName, contentType }: IFile): Promise<string> {
        
        const upload: Upload = new Upload({ 
            client: this.s3, 
            params: { 
                Bucket: this.configService.get('BUCKET_NAME'), 
                Body: dataBuffer, 
                ContentType: contentType, 
                Key: fileName 
            } 
        });

        try {

            const uploadResult = await upload.done();
    
            this.logger.debug(`file ${fileName} uploaded successfully to s3`);
    
            return uploadResult.Location;

        } catch (error) {
            
            this.logger.error(`failed to upload file ${fileName} to s3`, error);

            throw new BadRequestException('files.upload.failed');
        }
    }
}
