import {Controller, Get, LoggerService} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    console.log(configService.get<string>('ENV'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
