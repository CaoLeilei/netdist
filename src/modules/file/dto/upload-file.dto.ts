import { IsString } from 'class-validator';
export class UploadFileDto {
  @IsString()
  parentPath: string;
  @IsString()
  fileName: string;
}
