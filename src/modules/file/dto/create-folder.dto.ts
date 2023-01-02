import { IsString } from 'class-validator';
export class CreateFolderDto {
  @IsString()
  folderName: string;
  @IsString()
  parent: string;
}
