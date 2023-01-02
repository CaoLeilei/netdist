import { Injectable, Logger, HttpException } from '@nestjs/common';
import * as fse from 'fs-extra';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { UploadFileDto } from "./dto/upload-file.dto";

@Injectable()
export class FileService {
  fileBasePath: string;
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    logger.log('hello world');
    logger.log('this.fileBasePath:', this.fileBasePath);
    logger.error('process.cwd()', process.cwd());
    // console.log(this.fileBasePath);
  }

  async checkAndCreateFolder(baseFolder: string) {
    if (!fse.existsSync(baseFolder)) {
      fse.ensureDirSync(baseFolder);
    }
    return true;
  }

  async getFileList(parent = '') {
    if (!fse.statSync(parent).isDirectory()) {
      return [];
    }
    const filesInFolder = fse.readdirSync(parent);
    return filesInFolder;
  }

  async saveFile(file: Express.Multer.File, data: UploadFileDto) {
    const filePath = path.join(data.parentPath, data.fileName);
    const writeStream = fse.createWriteStream(filePath);
    fse.ensureFileSync(filePath);
    writeStream.write(file.buffer);
  }

  async checkFileAndFolderExists(path) {
    return fse.existsSync(path);
  }
}
