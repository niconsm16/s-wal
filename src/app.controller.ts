import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { resolve } from 'path';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  index(@Res() res: Response) {
    res.status(200).sendFile(resolve() + '/public/index.html');
  }
}
