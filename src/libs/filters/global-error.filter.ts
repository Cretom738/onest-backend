
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';
  
@Catch()
export class GlobalErrorFilter implements ExceptionFilter {

    private readonly logger: Logger = new Logger(GlobalErrorFilter.name);

    catch(exception: Error, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse<Response>();

        this.logger.error(exception.message);

        let nestException: HttpException = new BadRequestException('something.went.wrong');

        if (exception instanceof HttpException) {
            nestException = exception;
        }

        if (exception instanceof PrismaClientKnownRequestError 
            && exception.code === 'P2025') {
            nestException = new NotFoundException('not.found');
        }

        response.status(nestException.getStatus()).json(nestException.getResponse());
    }
}