import { IFile } from 'src/libs/interfaces/file.interface';

export interface IFilesService {
  uploadFile(file: IFile): Promise<string>;
}
