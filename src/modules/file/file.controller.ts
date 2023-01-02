import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { FileService } from './file.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { DeleteFileDto } from './dto/delete-file.dto';
import { CreateFolderDto } from './dto/create-folder.dto';

@Controller('api/file')
export class FileController {
  fileBase: string;
  currdernDir: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {
    const fileBase = this.configService.get<string>('FILE_BASE_PATH');
    const pwd = process.cwd();
    this.fileBase = path.join(pwd, fileBase);
    this.currdernDir = this.fileBase;
    this.checkBaseFolderAndCreate();
  }

  private async checkBaseFolderAndCreate() {
    await this.fileService.checkAndCreateFolder(this.fileBase);
  }

  @Get('list')
  async lisFiles(
    @Query('parent') parent?: string,
    @Query('type') type?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<string[]> {
    console.log(type);
    console.log(page);
    console.log(pageSize);
    const parentPath =
      parent === undefined ? this.fileBase : path.join(this.fileBase, parent);
    const fileList = await this.fileService.getFileList(parentPath);
    return fileList;
  }

  @Post('delete')
  async DeleteFiles(@Body() deleteFileDto: DeleteFileDto) {
    return deleteFileDto;
  }

  @Post('crateFolder')
  async CreateFolder(@Body() createFolderDto: CreateFolderDto) {
    console.log(createFolderDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() uploadFileDto: UploadFileDto) {
    const parentPath = uploadFileDto.parentPath
      ? path.join(this.fileBase, uploadFileDto.parentPath)
      : this.fileBase;
    console.log('parentPath:', parentPath);
    uploadFileDto.parentPath = parentPath;
    return this.fileService.saveFile(file, uploadFileDto);
  }
}
